// Copyright 2023 Paion Data. All rights reserved.
import neo4j, { Driver } from 'neo4j-driver'

import { createDriverOrFailFn } from './driverFactory'
import { KERBEROS, NATIVE, SSO } from 'services/bolt/boltHelpers'
import {
  isNonRoutingScheme,
  isNonSupportedRoutingSchemeError,
  toNonRoutingScheme
} from 'services/boltscheme.utils'
import { Connection } from 'shared/modules/connections/connectionsDuck'

interface GlobalDriversObject {
  getDirectDriver: () => Driver | null
  getRoutedDriver: () => Driver | null
  close: () => void
}

let _drivers: GlobalDriversObject | null = null

export const getGlobalDrivers = () => _drivers
export const setGlobalDrivers = (drivers: GlobalDriversObject) =>
  (_drivers = drivers)
export const unsetGlobalDrivers = () => (_drivers = null)

export const buildGlobalDriversObject = async (
  props: Connection,
  opts = {},
  failFn: (error: Error) => void = () => {}
): Promise<GlobalDriversObject> => {
  const driversObj: { direct?: Driver | null; routed?: Driver | null } = {}
  const auth = buildAuthObj(props)
  let routingSupported = !isNonRoutingScheme(props.host || '')

  // Scheme says routing should be supported
  // but in the Neo4j 3.X case, it might not be true.
  // We need to verify this.
  if (routingSupported) {
    try {
      const routed = createDriverOrFailFn(
        props.host || '',
        auth,
        opts,
        () => {}
      )
      routed && (await routed.verifyConnectivity())
      routingSupported = true
    } catch (e) {
      if (e && isNonSupportedRoutingSchemeError(e)) {
        routingSupported = false
        failFn(e)
      }
    }
  }

  const getDirectDriver = (): Driver | null => {
    if (driversObj.direct) return driversObj.direct
    const directUrl = toNonRoutingScheme(props.host || '') || ''
    driversObj.direct = createDriverOrFailFn(directUrl, auth, opts, failFn)
    return driversObj.direct
  }
  const getRoutedDriver = (): Driver | null => {
    if (!routingSupported) return getDirectDriver()
    if (driversObj.routed) return driversObj.routed
    driversObj.routed = createDriverOrFailFn(
      props.host || '',
      auth,
      opts,
      failFn
    )
    return driversObj.routed
  }
  return {
    getDirectDriver,
    getRoutedDriver,
    close: () => {
      if (driversObj.direct) driversObj.direct.close()
      if (driversObj.routed) driversObj.routed.close()
    }
  }
}

export const buildAuthObj = (props: {
  authenticationMethod?: string
  password: string
  username: string
}) => {
  let auth
  if (props.authenticationMethod === KERBEROS) {
    auth = neo4j.auth.kerberos(props.password)
  } else if (
    props.authenticationMethod === NATIVE ||
    props.authenticationMethod === SSO ||
    !props.authenticationMethod
  ) {
    auth = neo4j.auth.basic(props.username, props.password)
  } else {
    auth = neo4j.auth.basic('', '')
  }
  return auth
}
