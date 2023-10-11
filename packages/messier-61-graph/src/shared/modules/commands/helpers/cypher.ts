// Copyright 2023 Paion Data. All rights reserved.
import { QueryResult } from 'neo4j-driver'

import bolt from 'services/bolt/bolt'
import { applyGraphTypes } from 'services/bolt/boltMappings'
import { arrayToObject } from 'services/utils'
import { send } from 'shared/modules/requests/requestsDuck'

export const applyParamGraphTypes = (params = {} as any) =>
  arrayToObject(
    Object.keys(params).map(k => ({
      [k]: applyGraphTypes(params[k])
    }))
  )

export const handleCypherCommand = (
  action: any,
  put: any,
  params = {} as any,
  txMetadata = {},
  autoCommit = false
): [string, Promise<QueryResult>] => {
  const [id, request] = bolt.routedWriteTransaction(
    action.query,
    applyParamGraphTypes(params),
    {
      requestId: action.requestId,
      cancelable: true,
      ...txMetadata,
      autoCommit,
      useDb: action.useDb
    }
  )
  put(send(id))
  return [id, request]
}
