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

const BrowserSyncAuthWindow = (url: any, callback: any) => {
  const win: any = window.open(
    url,
    'loginWindow',
    'location=0,status=0,scrollbars=0, width=1080,height=720'
  )
  const pollInterval = setInterval(() => {
    win.postMessage('Polling for results', url)
  }, 6000)
  try {
    win.moveTo(500, 300)
  } catch (e) {
    callback(null, e)
  }
  const listener = (event: any) => {
    if (url.indexOf(event.origin) !== 0) return
    clearInterval(pollInterval)
    window.removeEventListener('message', listener)
    callback(event.data)
    win.close()
  }
  window.addEventListener('message', listener, false)
}

export default BrowserSyncAuthWindow
