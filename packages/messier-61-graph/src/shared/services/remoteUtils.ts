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

/* global btoa */
import { parseURLWithDefaultProtocol } from 'services/utils'

const removeJavascriptFromHref = (string: any) => {
  const localString = string.replace(/href=".*javascript:[^"]*"/, 'href=""')
  return localString.replace(/href='.*javascript:[^']*'/, "href=''")
}
const removeScriptTags = (string: any) =>
  string.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*(<\/script>)?/gi, '')
const removeOnHandlersFromHtml = (string: any) =>
  string.replace(
    /(\s+(on[^\s=]+)[^\s=]*\s*=\s*("[^"]*"|'[^']*'|[\w\-.:]+\s*))/gi,
    ''
  )

export function cleanHtml(string: string): string {
  if (typeof string !== 'string') return string
  const stringWithoutHandlers = removeOnHandlersFromHtml(string)
  const stringWithoutScript = removeScriptTags(stringWithoutHandlers)
  return removeJavascriptFromHref(stringWithoutScript)
}

export const authHeaderFromCredentials = (username: any, password: any) => {
  if (!btoa) throw new Error('btoa not defined') // Non browser env
  return btoa(`${username}:${password}`)
}

export const isLocalRequest = (
  localUrl?: string | null,
  requestUrl?: string | null,
  opts = { hostnameOnly: false }
): boolean => {
  if (!localUrl || !requestUrl) return false

  const localUrlInfo = parseURLWithDefaultProtocol(localUrl)
  if (!localUrlInfo) return false

  if (requestUrl.startsWith('/')) return true

  const requestUrlInfo = parseURLWithDefaultProtocol(requestUrl)
  if (!requestUrlInfo) return false

  if (!requestUrlInfo.host) return true // GET /path

  if (opts.hostnameOnly === true) {
    return requestUrlInfo.hostname === localUrlInfo.hostname
  } // GET localhost:8080 from localhost:9000

  if (
    requestUrlInfo.host === localUrlInfo.host &&
    requestUrlInfo.protocol === localUrlInfo.protocol
  ) {
    // Same host and protocol
    return true
  }
  return false
}
