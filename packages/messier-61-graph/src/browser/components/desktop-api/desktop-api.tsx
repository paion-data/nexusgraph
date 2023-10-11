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
import { useEffect } from 'react'

import { eventToHandler } from './desktop-api.utils'

const DEFAULT_INTEGRATION_POINT = (window as any).neo4jDesktopApi

function DesktopApi({
  integrationPoint = DEFAULT_INTEGRATION_POINT,
  setEventMetricsCallback,
  ...rest
}: any) {
  const getKerberosTicket =
    (integrationPoint && integrationPoint.getKerberosTicket) || undefined

  if (
    setEventMetricsCallback &&
    integrationPoint &&
    integrationPoint.sendMetrics
  ) {
    const takeMetrics = ({ category, label, data }: any) => {
      integrationPoint.sendMetrics(category, label, data)
    }
    setEventMetricsCallback(takeMetrics)
  }
  useEffect(() => {
    async function mountEvent() {
      if (integrationPoint && integrationPoint.getContext) {
        // Pull initial data and call handler if defined
        if (rest.onMount) {
          const context = await integrationPoint.getContext()
          rest.onMount('MOUNT', context, {}, getKerberosTicket)
        }
      }
    }

    function onUpdate() {
      // Arguments change
      if (
        integrationPoint &&
        integrationPoint.onArgumentsChange &&
        rest.onArgumentsChange
      ) {
        integrationPoint.onArgumentsChange(rest.onArgumentsChange)
      }
      // Regular events
      if (integrationPoint && integrationPoint.onContextUpdate) {
        // Setup generic event listener
        integrationPoint.onContextUpdate(
          (event: any, context: any, oldContext: any) => {
            const handlerName = eventToHandler(event.type)
            // If we have a prop that's interested in this event, call it
            if (handlerName && typeof rest[handlerName] !== 'undefined') {
              rest[handlerName](event, context, oldContext, getKerberosTicket)
            }
          }
        )
      }
    }

    mountEvent()
    onUpdate()

    return () => {
      integrationPoint &&
        integrationPoint.onContextUpdate &&
        integrationPoint.onContextUpdate(null)
      integrationPoint &&
        integrationPoint.onArgumentsChange &&
        integrationPoint.onArgumentsChange(null)
    }
  }, [integrationPoint])
  return null
}

export default DesktopApi
