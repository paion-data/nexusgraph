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
import { URL } from 'whatwg-url'
export const parseHttpVerbCommand = (input: any) => {
  const p = new Promise((resolve, reject) => {
    const re = /^[^\w]*(get|post|put|delete|head)\s+(\S+)?\s*([\S\s]+)?$/i
    const result: any = re.exec(input)
    let method, url, data
    try {
      ;[method, url, data] = [result[1], result[2] || null, result[3] || null]
    } catch (e) {
      reject(new Error('Unparseable http request'))
      return
    }
    if (!url) {
      reject(new Error('Missing path'))
      return
    }
    method = method.toLowerCase()
    if (['post', 'put'].indexOf(method) > -1 && data) {
      // Assume JSON
      try {
        JSON.parse(data.replace(/\n/g, ''))
      } catch (e) {
        reject(new Error('Payload does not seem to be valid (JSON) data'))
        return
      }
    }
    resolve({ method, url, data })
  })
  return p
}

// Check if valid url, from http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export function isValidUrl(url: string): boolean {
  let urlObject

  try {
    urlObject = new URL(url)
  } catch (_) {
    return false
  }

  return urlObject.protocol.startsWith('http')
}
