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

export const BrowserSyncAuthIframe = (
  silentAuthUrl: any,
  delegationTokenUrl: any,
  callback: any
) => {
  setupIframe(silentAuthUrl, 'auth0:silent-authentication', (data: any) => {
    setupIframe(
      `${delegationTokenUrl}${data.hash}`,
      'auth0:delegation-token',
      ({ userData }: any) => callback(userData)
    )
  })
}

export const BrowserSyncSignoutIframe = (logoutUrl: any, callback = () => {}) =>
  setupIframe(logoutUrl, undefined, callback)

function setupIframe(url: any, type: any, cb: any) {
  const iframe: any = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  if (!type) {
    // If no type, don't setup a listener and remove iframe onload
    iframe.onload = () => iframe.parentElement.removeChild(iframe)
    document.body.appendChild(iframe)
    return cb()
  }
  document.body.appendChild(iframe)
  const pollInterval = setInterval(() => {
    iframe.contentWindow.postMessage(`Polling ${url} for results`, url)
  }, 3000)
  const listener = (event: any) => {
    if (url.indexOf(event.origin) !== 0) return
    if (!event.data || event.data.type !== type) return
    clearInterval(pollInterval)
    window.removeEventListener('message', listener)
    iframe.parentElement.removeChild(iframe)
    cb(event.data)
  }
  window.addEventListener('message', listener, false)
}
