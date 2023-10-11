// Copyright 2023 Paion Data. All rights reserved.

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
