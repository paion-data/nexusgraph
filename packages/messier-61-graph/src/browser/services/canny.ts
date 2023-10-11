// Copyright 2023 Paion Data. All rights reserved.
import { Component, ReactNode } from 'react'

import { canUseDOM } from 'services/utils'

export const cannyOptions = {
  appID: '601d00fb7a41e3035f75e1e8',
  position: 'right',
  align: 'top'
}
export const CANNY_FEATURE_REQUEST_URL = 'https://feedback.neo4j.com/browser'

export interface CannyOptions {
  appID: string
  position: string
  align: string
}
declare global {
  interface Window {
    Canny?: { (command: string, options?: CannyOptions): void }
    IsCannyLoaded?: boolean
    attachEvent?: typeof window.addEventListener
  }
}

const CannySDK = {
  init: (): Promise<Event> =>
    new Promise(function (resolve, reject) {
      // Code obtained from Canny.io; See: https://developers.canny.io/install

      if (typeof window.Canny === 'function') {
        return
      }

      const canny = function (...args: [string, CannyOptions?]) {
        canny.q.push(args)
      }

      canny.q = [] as [string, CannyOptions?][]
      window.Canny = canny

      function loadCanny() {
        if (document.getElementById('canny-jssdk')) {
          return
        }
        const firstScriptElement = document.getElementsByTagName('script')[0]
        const scriptElement = document.createElement('script')
        scriptElement.type = 'text/javascript'
        scriptElement.async = true
        scriptElement.src = 'https://canny.io/sdk.js'
        scriptElement.onerror = reject
        scriptElement.onload = resolve
        scriptElement.addEventListener('error', reject)
        scriptElement.addEventListener('load', resolve)
        firstScriptElement?.parentNode?.insertBefore(
          scriptElement,
          firstScriptElement
        )
      }

      if (document.readyState === 'complete') {
        loadCanny()
      } else if (window.attachEvent) {
        window.attachEvent('onload', loadCanny)
      } else {
        window.addEventListener('load', loadCanny, false)
      }
    })
}

export class CannyLoader extends Component {
  componentDidMount(): void {
    CannySDK.init()
      .then(() => {
        window.IsCannyLoaded = true
        window.Canny && window.Canny('initChangelog', cannyOptions)
      })
      .catch(() => {
        window.IsCannyLoaded = false
      })
  }

  shouldComponentUpdate(): boolean {
    return false
  }

  componentWillUnmount(): void {
    if (canUseDOM()) {
      window.Canny && window.Canny('closeChangelog')

      delete window.IsCannyLoaded
      delete window.Canny
    }
  }

  render(): ReactNode {
    return null
  }
}
