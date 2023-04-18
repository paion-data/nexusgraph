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
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import DesktopApi from './desktop-api'

describe('<DesktopApi>', () => {
  test('does not render anything if no integration point', () => {
    // Given
    const integrationPoint = null

    // When
    const { container } = render(
      <DesktopApi integrationPoint={integrationPoint} />
    )

    // Then
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
  test('does not render anything if there is an integration point', () => {
    // Given
    const integrationPoint = { x: true }

    // When
    const { container } = render(
      <DesktopApi integrationPoint={integrationPoint} />
    )

    // Then
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
  test('calls onMount with data on mounting', async () => {
    // Given
    const mFn = jest.fn()
    const context = {
      projects: [
        {
          graphs: [
            {
              status: 'ACTIVE',
              configuration: {
                protocols: {
                  bolt: {
                    username: 'neo4j'
                  }
                }
              }
            }
          ]
        }
      ]
    }
    const integrationPoint = { getContext: () => Promise.resolve(context) }

    // When
    const { rerender } = render(
      <DesktopApi integrationPoint={integrationPoint} onMount={mFn} />
    )
    await waitFor(() => expect(mFn).toHaveBeenCalledTimes(1))

    // When
    rerender(<DesktopApi integrationPoint={integrationPoint} />)

    // Then
    expect(mFn).toHaveBeenCalledTimes(1)
  })
  test('calls onXxx with data on event XXX', () => {
    // Given
    let componentOnContextUpdate = (_e: any, _nc: any, _oc: any) => undefined
    const fn = jest.fn()
    const oldContext = { projects: [] }
    const newContext = { projects: [{ project: {} }] }
    const event = { type: 'XXX' }
    const nonListenEvent = { type: 'YYY' }
    const integrationPoint = {
      onContextUpdate: (fn: any) => (componentOnContextUpdate = fn),
      getKerberosTicket: jest.fn()
    }

    // When
    render(<DesktopApi integrationPoint={integrationPoint} onXxx={fn} />)

    // Then
    expect(fn).toHaveBeenCalledTimes(0)

    // When
    componentOnContextUpdate(event, newContext, oldContext)

    // Then
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith(
      event,
      newContext,
      oldContext,
      integrationPoint.getKerberosTicket
    )

    // When
    componentOnContextUpdate(nonListenEvent, newContext, oldContext) // We don't listen for this

    // Then
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith(
      event,
      newContext,
      oldContext,
      integrationPoint.getKerberosTicket
    )

    // When
    componentOnContextUpdate(event, newContext, oldContext) // Another one we're listening on

    // Then
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith(
      event,
      newContext,
      oldContext,
      integrationPoint.getKerberosTicket
    )
  })
  test('calls onArgumentsChange when args change', () => {
    // Given
    let componentOnArgumentsChange = (_s: string) => undefined
    const newArgsString = 'test=1&test2=2'
    const fn = jest.fn()
    const integrationPoint = {
      onArgumentsChange: (fn: any) => (componentOnArgumentsChange = fn)
    }

    // When
    render(
      <DesktopApi integrationPoint={integrationPoint} onArgumentsChange={fn} />
    )

    // Then
    expect(fn).toHaveBeenCalledTimes(0)

    // When
    componentOnArgumentsChange(newArgsString)

    // Then
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith(newArgsString)
  })
  test('calls sendMetrics callback if setEventMetricsCallback is set', () => {
    // Given
    let componentMetricsCallback = (_: any) => undefined
    const metricsCallArgs = {
      category: 'metrics_test',
      label: 'runs',
      data: { x: 1 }
    }
    const fn = (takeMetrics: any) => (componentMetricsCallback = takeMetrics)
    const integrationPoint = {
      sendMetrics: jest.fn()
    }

    // When
    render(
      <DesktopApi
        integrationPoint={integrationPoint}
        setEventMetricsCallback={fn}
      />
    )

    // Then
    expect(integrationPoint.sendMetrics).toHaveBeenCalledTimes(0)

    // When
    componentMetricsCallback(metricsCallArgs)

    // Then
    expect(integrationPoint.sendMetrics).toHaveBeenCalledTimes(1)
    expect(integrationPoint.sendMetrics).toHaveBeenLastCalledWith(
      metricsCallArgs.category,
      metricsCallArgs.label,
      metricsCallArgs.data
    )
  })
})
