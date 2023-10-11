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
import { combineReducers, createStore } from 'redux'

import { LegacySysInfoFrame } from './LegacySysInfoFrame'
import reducers from 'project-root/src/shared/rootReducer'

const baseProps = {
  bus: null as any,
  frame: null as any,
  isFullscreen: false,
  isCollapsed: false,
  isOnCluster: false
}

describe('LegacySysInfoFrame', () => {
  test('should display error when there is no connection', () => {
    // Given
    const props = { ...baseProps, isConnected: false }

    // When
    const reducer = combineReducers({ ...(reducers as any) })
    const store: any = createStore(reducer)
    const { getAllByText } = render(
      <Provider store={store}>
        <LegacySysInfoFrame {...props} />
      </Provider>
    )

    // Then
    expect(getAllByText(/No connection available/i)).not.toBeNull()
  })
})
