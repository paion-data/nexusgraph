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
import { version } from 'project-root/package.json'

// Application info
export const NEO4J_BROWSER_BACKGROUND_QUERY = 'system'
export const NEO4J_BROWSER_USER_QUERY = 'user-direct'
export const NEO4J_BROWSER_USER_ACTION_QUERY = 'user-action'
export const DEFAULT_QUERY_METADATA_TYPE = NEO4J_BROWSER_USER_ACTION_QUERY
export const NEO4J_BROWSER_APP_ID = `neo4j-browser_v${version}`

export const backgroundTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_BACKGROUND_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}

export const userDirectTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_USER_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}
export const userActionTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_USER_ACTION_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}
export const defaultTxMetadata = userActionTxMetadata

export const getUserTxMetadata = (
  type: string = DEFAULT_QUERY_METADATA_TYPE
) => ({
  txMetadata: {
    type,
    app: NEO4J_BROWSER_APP_ID
  }
})
