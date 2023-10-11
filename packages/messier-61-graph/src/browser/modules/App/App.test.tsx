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

/* eslint-disable react/display-name */
import { render } from '@testing-library/react'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import { App } from './App'

const mockStore = configureMockStore()
const store = mockStore({})

jest.mock('../FeatureToggle/FeatureToggleProvider', () => {
  return ({ children }: any) => <div>{children}</div>
})
jest.mock('./PerformanceOverlay.tsx', () => () => <div />)
jest.mock('./styled', () => {
  const orig = jest.requireActual('./styled')
  return {
    ...orig,
    StyledApp: () => <div>Loaded</div>
  }
})

describe('App', () => {
  test('App loads', async () => {
    // Given
    const props = {
      store,
      telemetrySettings: {
        allowUserStats: false,
        allowCrashReporting: false,
        source: 'BROWSER_SETTING'
      }
    }

    // When
    const { getByText } = render(<App {...props} />)

    // Then
    expect(getByText('Loaded'))
  })
})
