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
import { Session } from 'neo4j-driver'

import { parseURLWithDefaultProtocol } from 'services/utils'

export const KERBEROS = 'KERBEROS'
export const NATIVE = 'NATIVE'
export const NO_AUTH = 'NO_AUTH'
export const SSO = 'SSO'

export const getDiscoveryEndpoint = (url?: string): string => {
  const defaultEndpoint = 'http://localhost/'
  if (!url) {
    return defaultEndpoint
  }

  const info = parseURLWithDefaultProtocol(url)
  return info ? `${info.protocol}//${info.host}/` : defaultEndpoint
}

export const isConfigValTruthy = (val: boolean | string | number): boolean =>
  [true, 'true', 'yes', 1, '1'].indexOf(val) > -1
export const isConfigValFalsy = (val: boolean | string | number): boolean =>
  [false, 'false', 'no', 0, '0'].indexOf(val) > -1

export const buildTxFunctionByMode = (session?: Session) => {
  if (!session) {
    return null
  }
  return (session as any)._mode !== 'READ'
    ? session.writeTransaction.bind(session)
    : session.readTransaction.bind(session)
}
