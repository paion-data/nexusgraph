// Copyright 2023 Paion Data. All rights reserved.
import { QueryResult, types } from 'neo4j-driver'

import { applyGraphTypes } from './boltMappings'
import {
  BOLT_CONNECTION_ERROR_MESSAGE,
  CYPHER_ERROR_MESSAGE,
  CYPHER_RESPONSE_MESSAGE,
  POST_CANCEL_TRANSACTION_MESSAGE
} from './boltWorkerMessages'
import WorkPool from 'services/WorkPool'

export const setupBoltWorker = (
  boltWorkPool: WorkPool,
  id: string,
  payload: any,
  onLostConnection: (error: Error) => void = (): void => undefined
): Promise<QueryResult> => {
  const workerPromise = new Promise<QueryResult>((resolve, reject) => {
    const work = boltWorkPool.doWork({
      id,
      payload,
      onmessage: ({ data }) => {
        switch (data.type) {
          case BOLT_CONNECTION_ERROR_MESSAGE:
            boltWorkPool.finishWork(work.id)
            onLostConnection(data.error)
            reject(data.error)
            break
          case CYPHER_ERROR_MESSAGE:
            boltWorkPool.finishWork(work.id)
            reject(data.error)
            break
          case CYPHER_RESPONSE_MESSAGE:
            boltWorkPool.finishWork(work.id)
            resolve(addTypesAsField(data.result))
            break
          case POST_CANCEL_TRANSACTION_MESSAGE:
            boltWorkPool.finishWork(work.id)
            break
          default:
            return
        }
      }
    })
  })
  return workerPromise
}

export const addTypesAsField = (result: QueryResult): QueryResult => {
  const records = result.records.map((record: any) => {
    const typedRecord = new (types.Record as any)(
      record.keys,
      record._fields,
      record._fieldLookup
    )
    if (typedRecord._fields) {
      typedRecord._fields = applyGraphTypes(typedRecord._fields)
    }
    return typedRecord
  })
  const summary = applyGraphTypes(result.summary)
  return { summary, records }
}
