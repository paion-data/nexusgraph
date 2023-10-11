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
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { CypherFrame, CypherFrameProps } from './CypherFrame'
import { Frame } from 'shared/modules/frames/framesDuck'
import {
  BrowserRequest,
  BrowserRequestResult
} from 'shared/modules/requests/requestsDuck'

const createProps = (
  status: string,
  result: BrowserRequestResult
): CypherFrameProps => ({
  autoComplete: true,
  initialNodeDisplay: 10,
  onRecentViewChanged: () => undefined,
  maxRows: 10,
  maxNeighbours: 10,
  activeConnectionData: null,
  isCollapsed: false,
  isFullscreen: false,
  setExportItems: () => undefined,
  stack: [],
  frame: { cmd: 'return 1' } as Frame & { isPinned: false },
  request: {
    status,
    updated: Math.random(),
    result
  } as BrowserRequest
})
const withProvider = (store: any, children: any) => {
  return <Provider store={store}>{children}</Provider>
}

describe('CypherFrame', () => {
  const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      settings: {
        maxRows: 1000,
        maxFieldItems: 1000
      },
      app: {}
    })
  }
  test('renders accordingly from pending to success to error to success', () => {
    // Given
    const pendingProps = createProps('pending', undefined)
    const successProps = createProps('success', {
      records: [{ keys: ['name'], _fields: ['Molly'], get: () => 'Molly' }]
    } as any)
    const errorProps = createProps('error', { code: 'Test.Error' } as any)

    // When
    const { queryByText, getByText, getAllByText, getByTestId, rerender } =
      render(withProvider(store, <CypherFrame {...pendingProps} />))

    // Then
    expect(getByTestId('spinner')).not.toBeNull()
    expect(getByText(/Table/i)).not.toBeNull()
    expect(getByText(/Code/i)).not.toBeNull()
    expect(queryByText(/Error/)).toBeNull()

    // When successful request
    rerender(withProvider(store, <CypherFrame {...successProps} />))

    // Then
    expect(getByText(/Molly/i)).not.toBeNull()
    expect(getByText(/Table/i)).not.toBeNull()
    expect(getByText(/Code/i)).not.toBeNull()
    expect(queryByText(/Error/)).toBeNull()

    // When error request
    rerender(withProvider(store, <CypherFrame {...errorProps} />))

    // Then
    expect(queryByText(/Table/i)).toBeNull()
    expect(queryByText(/Code/i)).toBeNull()
    expect(getAllByText(/Error/)).not.toBeNull()
    expect(getAllByText(/Test.Error/)).not.toBeNull()

    // When successful request again
    rerender(withProvider(store, <CypherFrame {...successProps} />))

    // Then
    expect(getByText(/Molly/i)).not.toBeNull()
    expect(getByText(/Table/i)).not.toBeNull()
    expect(getByText(/Code/i)).not.toBeNull()
    expect(queryByText(/Error/)).toBeNull()
  })
})
