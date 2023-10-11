/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import neo4j, { Driver } from 'neo4j-driver'

import { isBoltConnectionErrorCode } from './boltConnectionErrors'
import { createDriverOrFailFn } from './driverFactory'
import {
  buildAuthObj,
  buildGlobalDriversObject,
  getGlobalDrivers,
  setGlobalDrivers,
  unsetGlobalDrivers
} from './globalDrivers'
import { buildTxFunctionByMode } from 'services/bolt/boltHelpers'
import { Connection } from 'shared/modules/connections/connectionsDuck'
import { backgroundTxMetadata } from './txMetadata'

export const DIRECT_CONNECTION = 'DIRECT_CONNECTION'
export const ROUTED_WRITE_CONNECTION = 'ROUTED_WRITE_CONNECTION'
export const ROUTED_READ_CONNECTION = 'ROUTED_READ_CONNECTION'

export const hasMultiDbSupport = async (): Promise<boolean> => {
  if (!getGlobalDrivers()) {
    return false
  }
  const drivers = getGlobalDrivers()
  const tmpDriver = drivers && drivers.getRoutedDriver()
  if (!tmpDriver) {
    return false
  }
  const supportsMultiDb = await tmpDriver.supportsMultiDb()
  return supportsMultiDb
}

const validateConnectionFallback = (
  driver: Driver,
  res: (driver: Driver) => void,
  rej: (error?: any) => void,
  multiDbSupport: boolean
): void => {
  const session = driver.session({
    defaultAccessMode: neo4j.session.READ,
    database: multiDbSupport ? 'system' : undefined
  })
  session
    .readTransaction(tx => tx.run('CALL db.indexes()'), {
      metadata: backgroundTxMetadata.txMetadata
    })
    .then(() => {
      session.close()
      res(driver)
    })
    .catch((e: { code: string; message: string }) => {
      session.close()
      // Only invalidate the connection if not available
      // or not authed
      // or credentials have expired
      if (!e.code || isBoltConnectionErrorCode(e.code)) {
        rej(e)
      } else {
        res(driver)
      }
    })
}

export const validateConnection = (
  driver: Driver | null,
  res: (driver: Driver) => void,
  rej: (error?: any) => void
): void => {
  if (driver === null) {
    rej()
    return
  }

  driver
    .supportsMultiDb()
    .then((multiDbSupport: boolean) => {
      if (!driver || !driver.session) return rej('No connection')
      const session = driver.session({
        defaultAccessMode: neo4j.session.READ,
        database: multiDbSupport ? 'system' : undefined
      })
      //Can be any query, is used use to validate the connection and to get an error code if user has expired crdentails for example.
      //This query works for version 4.3 and above. For older versions, use the fallback function.
      session
        .readTransaction(tx => tx.run('SHOW DATABASES'), {
          metadata: backgroundTxMetadata.txMetadata
        })
        .then(() => {
          session.close()
          res(driver)
        })
        .catch((e: { code: string; message: string }) => {
          session.close()
          // Only invalidate the connection if not available
          // or not authed
          // or credentials have expired
          if (!e.code || isBoltConnectionErrorCode(e.code)) {
            rej(e)
          } else {
            // if connection could not be validated using SHOW PROCEDURES then try using CALL db.indexes()
            //Remove this fallback function when we drop support for older versions and replace with "res(driver)".
            validateConnectionFallback(driver, res, rej, multiDbSupport)
          }
        })
    })
    .catch(rej)
}

export function directConnect(
  props: Connection,
  opts = {},
  onLostConnection: (error: Error) => void = (): void => undefined,
  shouldValidateConnection = true
): Promise<Driver> {
  const p = new Promise<Driver>((resolve, reject) => {
    const auth = buildAuthObj(props)
    const driver = createDriverOrFailFn(props.host || '', auth, opts, e => {
      onLostConnection(e)
      reject(e)
    })
    if (shouldValidateConnection) {
      validateConnection(driver, resolve, reject)
    } else {
      resolve(driver!)
    }
  })
  return p
}

export function openConnection(
  props: Connection,
  opts = {},
  onLostConnection: (error: Error) => void = (): void => undefined
): Promise<unknown> {
  const p = new Promise(async (resolve, reject) => {
    const onConnectFail = (e: Error): void => {
      onLostConnection(e)
      unsetGlobalDrivers()
      reject(e)
    }
    const driversObj = await buildGlobalDriversObject(
      props,
      opts,
      onConnectFail
    )
    const driver = driversObj.getDirectDriver()
    const myResolve = (driver: Driver): void => {
      setGlobalDrivers(driversObj)
      resolve(driver)
    }
    const myReject = (err: Error): void => {
      onLostConnection(err)
      unsetGlobalDrivers()
      driversObj.close()
      reject(err)
    }
    validateConnection(driver, myResolve, myReject)
  })
  return p
}

export const closeGlobalConnection = (): void => {
  const globalDrivers = getGlobalDrivers()
  if (globalDrivers) {
    globalDrivers.close()
    unsetGlobalDrivers()
  }
}

export const ensureConnection = (
  props: Connection,
  opts: Record<string, unknown>,
  onLostConnection: () => void
): Promise<unknown> => {
  const session = getGlobalDrivers()
    ?.getDirectDriver()
    ?.session({ defaultAccessMode: neo4j.session.READ })
  if (session) {
    return new Promise<void>(resolve => {
      session.close()
      resolve()
    })
  } else {
    return openConnection(props, opts, onLostConnection)
  }
}
