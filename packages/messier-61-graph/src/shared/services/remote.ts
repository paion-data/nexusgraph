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
import 'isomorphic-fetch'

function request(method: any, url: any, data = null, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Ajax-Browser-Auth': 'true',
    'X-stream': 'true',
    ...extraHeaders
  }
  return fetch(url, {
    method,
    headers,
    body: data
  }).then(checkStatus)
}

function get(url: string, headers: HeadersInit = {}): Promise<string> {
  return fetch(url, {
    method: 'get',
    headers
  })
    .then(checkStatus)
    .then(response => response.text())
}

export function getJSON(url: any) {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(e => {
      throw new Error(e)
    })
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw {
      ...new Error(`${response.status} ${response.statusText}`),
      response
    }
  }
}

export default {
  get,
  getJSON,
  request
}
