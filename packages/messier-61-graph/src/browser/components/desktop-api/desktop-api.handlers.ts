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
import {
  createConnectionCredentialsObject,
  getActiveGraph
} from './desktop-api.utils'

export const buildConnectionCreds = async (
  _event?: any,
  context?: any,
  _oldContext?: any,
  getKerberosTicket?: any,
  extra: any = {}
) => {
  const activeGraph = getActiveGraph(context) || {}
  const connectionsCredentialsObject = await createConnectionCredentialsObject(
    activeGraph,
    extra.defaultConnectionData,
    getKerberosTicket
  )
  // No connection. Probably no graph active.
  if (!connectionsCredentialsObject) {
    throw new Error('No connection creds found')
  }
  return connectionsCredentialsObject
}

export const getDesktopTheme = (_?: any, newContext?: any) => {
  if (newContext.global && newContext.global.prefersColorScheme) {
    return Promise.resolve(newContext.global.prefersColorScheme)
  }
  return Promise.resolve(null)
}
