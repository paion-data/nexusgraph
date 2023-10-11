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
import { Action, AnyAction } from 'redux'

import { ROUTED_WRITE_CONNECTION } from './boltConnection'
import { recursivelyTypeGraphItems } from './boltMappings'

export const RUN_CYPHER_MESSAGE = 'RUN_CYPHER_MESSAGE'
export const CANCEL_TRANSACTION_MESSAGE = 'CANCEL_TRANSACTION_MESSAGE'
export const CYPHER_ERROR_MESSAGE = 'CYPHER_ERROR_MESSAGE'
export const CYPHER_RESPONSE_MESSAGE = 'CYPHER_RESPONSE_MESSAGE'
export const POST_CANCEL_TRANSACTION_MESSAGE = 'POST_CANCEL_TRANSACTION_MESSAGE'
export const BOLT_CONNECTION_ERROR_MESSAGE = 'BOLT_CONNECTION_ERROR_MESSAGE'
export const CLOSE_CONNECTION_MESSAGE = 'CLOSE_CONNECTION_MESSAGE'

export const getWorkerPayloadForRunningCypherMessage = (
  input: string,
  parameters: unknown,
  connectionType = ROUTED_WRITE_CONNECTION,
  requestId = null,
  cancelable = false,
  connectionProperties: unknown
): AnyAction => {
  return {
    type: RUN_CYPHER_MESSAGE,
    input,
    parameters,
    connectionType,
    requestId,
    cancelable,
    connectionProperties
  }
}

export const cancelTransactionMessage = (id: string): AnyAction => {
  return {
    type: CANCEL_TRANSACTION_MESSAGE,
    id
  }
}

export const cypherResponseMessage = (result: unknown): AnyAction => {
  return {
    type: CYPHER_RESPONSE_MESSAGE,
    result: recursivelyTypeGraphItems(result)
  }
}

export const cypherErrorMessage = (error: {
  code: number
  message: string
}): AnyAction => {
  return {
    type: CYPHER_ERROR_MESSAGE,
    error
  }
}

export const postCancelTransactionMessage = (): Action => {
  return {
    type: POST_CANCEL_TRANSACTION_MESSAGE
  }
}

export const boltConnectionErrorMessage = (error: {
  code: string
  message: string
}): AnyAction => {
  return {
    type: BOLT_CONNECTION_ERROR_MESSAGE,
    error
  }
}

export const closeConnectionMessage = (): Action => ({
  type: CLOSE_CONNECTION_MESSAGE
})
