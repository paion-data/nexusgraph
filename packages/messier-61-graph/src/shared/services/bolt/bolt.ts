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
import neo4j, { QueryResult } from 'neo4j-driver'
import { v4 } from 'uuid'

import WorkPool from '../WorkPool'
import * as boltConnection from './boltConnection'
import * as mappings from './boltMappings'
import {
  cancelTransactionMessage,
  closeConnectionMessage,
  getWorkerPayloadForRunningCypherMessage
} from './boltWorkerMessages'
import { addTypesAsField, setupBoltWorker } from './setup-bolt-worker'
import { cancelTransaction as globalCancelTransaction } from './transactions'
import { NATIVE } from 'services/bolt/boltHelpers'
import { Connection } from 'shared/modules/connections/connectionsDuck'
import BoltWorkerModule from 'shared/services/bolt/boltWorker'

let connectionProperties: {} | null = null
let _useDb: string | null = null
const boltWorkPool = new WorkPool(() => new BoltWorkerModule(), 10)

function openConnection(
  props: Connection,
  opts = {},
  onLostConnection?: (error: Error) => void
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    boltConnection
      .openConnection(props, opts, onLostConnection)
      .then(() => {
        connectionProperties = {
          authenticationMethod: props.authenticationMethod || NATIVE,
          username: props.username,
          password: props.password,
          host: props.host,
          opts
        }
        resolve()
      })
      .catch(e => {
        connectionProperties = null
        reject(e)
      })
  })
}

function cancelTransaction(id: string, cb: any): void {
  const worker = boltWorkPool.getWorkerById(id)
  if (worker) {
    worker.work!.onFinish = cb
    worker.execute(cancelTransactionMessage(id))
  } else {
    globalCancelTransaction(id, cb)
  }
}

function routedWriteTransaction(
  input: any,
  parameters: any,
  requestMetaData: any = {}
): [string, Promise<QueryResult>] {
  const {
    requestId = null,
    cancelable = false,
    onLostConnection = () => {},
    txMetadata = undefined,
    autoCommit = false,
    useDb = null
  } = requestMetaData
  const id = requestId || v4()
  const payload = getWorkerPayloadForRunningCypherMessage(
    input,
    mappings.recursivelyTypeGraphItems(parameters),
    boltConnection.ROUTED_WRITE_CONNECTION,
    id,
    cancelable,
    {
      ...connectionProperties,
      txMetadata,
      useDb: useDb || _useDb,
      autoCommit
    }
  )
  const workerPromise = setupBoltWorker(
    boltWorkPool,
    id,
    payload,
    onLostConnection
  )
  return [id, workerPromise]
}

function routedReadTransaction(
  input: any,
  parameters: any,
  requestMetaData: any = {}
): Promise<QueryResult> {
  const {
    requestId = null,
    cancelable = false,
    onLostConnection = () => {},
    txMetadata = undefined,
    useDb = null
  } = requestMetaData
  const id = requestId || v4()
  const payload = getWorkerPayloadForRunningCypherMessage(
    input,
    mappings.recursivelyTypeGraphItems(parameters),
    boltConnection.ROUTED_READ_CONNECTION,
    id,
    cancelable,
    {
      ...connectionProperties,
      txMetadata,
      useDb: useDb || _useDb
    }
  )
  const workerPromise = setupBoltWorker(
    boltWorkPool,
    id,
    payload,
    onLostConnection
  )
  return workerPromise
}

function directTransaction(
  input: any,
  parameters: any,
  requestMetaData: any = {}
): Promise<QueryResult> {
  const {
    requestId = null,
    cancelable = false,
    onLostConnection = () => {},
    txMetadata = undefined,
    useDb = null
  } = requestMetaData
  const id = requestId || v4()
  const payload = getWorkerPayloadForRunningCypherMessage(
    input,
    mappings.recursivelyTypeGraphItems(parameters),
    boltConnection.DIRECT_CONNECTION,
    id,
    cancelable,
    {
      ...connectionProperties,
      txMetadata,
      useDb: useDb || _useDb
    }
  )
  const workerPromise = setupBoltWorker(
    boltWorkPool,
    id,
    payload,
    onLostConnection
  )
  return workerPromise
}

const closeConnectionInWorkers = (): void => {
  boltWorkPool.messageAllWorkers(closeConnectionMessage())
}

export default {
  hasMultiDbSupport: boltConnection.hasMultiDbSupport,
  useDb: (db: any) => (_useDb = db),
  directConnect: boltConnection.directConnect,
  openConnection,
  closeConnection: () => {
    connectionProperties = null
    boltConnection.closeGlobalConnection()
    closeConnectionInWorkers()
  },
  directTransaction,
  routedReadTransaction,
  routedWriteTransaction,
  cancelTransaction,
  recordsToTableArray: (records: any, convertInts = true) => {
    const intChecker = convertInts ? neo4j.isInt : () => true
    const intConverter = convertInts
      ? (item: any) =>
          mappings.itemIntToString(item, {
            intChecker: neo4j.isInt,
            intConverter: (val: any) => val.toNumber()
          })
      : (val: any) => val
    return mappings.recordsToTableArray(records, {
      intChecker,
      intConverter,
      objectConverter: mappings.extractFromNeoObjects
    })
  },
  extractNodesAndRelationshipsFromRecords: (
    records: any,
    maxFieldItems: any
  ) => {
    return mappings.extractNodesAndRelationshipsFromRecords(
      records,
      neo4j.types,
      maxFieldItems
    )
  },
  extractNodesAndRelationshipsFromRecordsForOldVis: (
    records: any,
    filterRels = true,
    maxFieldItems: any
  ) => {
    const intChecker = neo4j.isInt
    const intConverter = (val: any): string => val.toString()

    return mappings.extractNodesAndRelationshipsFromRecordsForOldVis(
      records,
      neo4j.types,
      filterRels,
      {
        intChecker,
        intConverter,
        objectConverter: mappings.extractFromNeoObjects
      },
      maxFieldItems
    )
  },
  extractPlan: (result: any, calculateTotalDbHits?: boolean) => {
    return mappings.extractPlan(result, calculateTotalDbHits)
  },
  retrieveFormattedUpdateStatistics: mappings.retrieveFormattedUpdateStatistics,
  itemIntToNumber: (item: any) =>
    mappings.itemIntToString(item, {
      intChecker: neo4j.isInt,
      intConverter: (val: any) => val.toNumber(),
      objectConverter: mappings.extractFromNeoObjects
    }),
  addTypesAsField
}
