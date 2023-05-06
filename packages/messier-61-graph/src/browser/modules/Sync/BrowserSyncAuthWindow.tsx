// Copyright 2023 Paion Data. All rights reserved.

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
