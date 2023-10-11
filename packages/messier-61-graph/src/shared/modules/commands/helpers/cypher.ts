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
