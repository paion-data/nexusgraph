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
import { Component } from 'react'
import { connect } from 'react-redux'

import { canUseDOM } from 'services/utils'
import { inDesktop } from 'shared/modules/app/appDuck'
import {
  getAuraNtId,
  getDesktopTrackingId,
  updateUdcData
} from 'shared/modules/udc/udcDuck'

export interface MetricsProperties {
  [key: string]: string | number | Date | boolean
}

export interface MetricsData {
  category: string
  label: string
  data: MetricsProperties
}

export class Segment extends Component<any> {
  componentDidMount() {
    const {
      segmentKey,
      setTrackCallback,
      inDesktop,
      updateData,
      auraNtId,
      desktopTrackingId,
      children, // eslint-disable-line
      ...otherProps
    } = this.props
    if (!segmentKey || !canUseDOM()) {
      return
    }
    if (!(window as any).analytics) {
      ;(function (
        window: any,
        document: Document,
        segmentKey: string,
        a?: any
      ) {
        const analytics = (window.analytics = window.analytics || [])
        if (!analytics.initialize) {
          if (analytics.invoked) {
            window.console &&
              console.error &&
              console.error('Segment snippet included twice.')
          } else {
            analytics.invoked = !0
            analytics.methods = [
              'trackSubmit',
              'trackClick',
              'trackLink',
              'trackForm',
              'pageview',
              'identify',
              'reset',
              'group',
              'track',
              'ready',
              'alias',
              'debug',
              'page',
              'once',
              'off',
              'on',
              'addSourceMiddleware',
              'addIntegrationMiddleware',
              'setAnonymousId',
              'addDestinationMiddleware'
            ]
            analytics.factory = function (t: any) {
              return function () {
                const e = Array.prototype.slice.call(arguments)
                e.unshift(t)
                analytics.push(e)
                return analytics
              }
            }
            for (let t = 0; t < analytics.methods.length; t++) {
              const e = analytics.methods[t]
              analytics[e] = analytics.factory(e)
            }
            analytics.load = function (t: any, e: any) {
              const n = document.createElement('script')
              n.type = 'text/javascript'
              n.async = !0
              n.src =
                'https://cdn.segment.com/analytics.js/v1/' +
                t +
                '/analytics.min.js'
              a = document.getElementsByTagName('script')[0]
              a.parentNode.insertBefore(n, a)
              analytics._loadOptions = e
            }
            analytics._writeKey = segmentKey
            analytics.SNIPPET_VERSION = '4.13.2'
            analytics.load(segmentKey)
            const doTrack = (metricsData: MetricsData) => {
              const { category, label, data } = metricsData
              window.analytics.track(category + '-' + label, {
                ...data,
                desktop: inDesktop
              })
            }

            if (auraNtId) {
              window.analytics.identify(auraNtId)
            } else if (inDesktop && desktopTrackingId) {
              window.analytics.identify(desktopTrackingId)
            }

            setTrackCallback(doTrack)
          }
        }
      })(window, document, segmentKey)
    }
    updateData({ ...otherProps, segmentKey: segmentKey })
  }

  componentDidUpdate() {
    const {
      segmentKey,
      updateData,
      children, // eslint-disable-line
      ...otherProps
    } = this.props
    if (!canUseDOM()) return
    updateData({ ...otherProps, segmentKey: segmentKey })
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    const { setTrackCallback } = this.props
    setTrackCallback(null)
    if (canUseDOM()) {
      delete (window as any).analytics
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: any) => ({
  inDesktop: inDesktop(state),
  auraNtId: getAuraNtId(state),
  desktopTrackingId: getDesktopTrackingId(state)
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateData: (data: any) => dispatch(updateUdcData(data))
  }
}
export default connect<any, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Segment)
