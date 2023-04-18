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

import { ServerSwitchFrame } from './ServerSwitchFrame'

test('shows successful message if connection was successful', () => {
  // Given
  const frame = {
    type: 'switch-success',
    activeConnectionData: { host: 'test-host', username: 'test-username' },
    storeCredentials: true
  }
  const activeConnectionData = { authEnabled: true }

  // When
  const { getByText } = render(
    <ServerSwitchFrame
      frame={frame}
      activeConnectionData={activeConnectionData}
    />
  )

  // Then
  expect(getByText(frame.activeConnectionData.host)).not.toBe(null)
  expect(getByText(frame.activeConnectionData.username)).not.toBe(null)
  expect(getByText(/credentials are\s*stored/)).not.toBe(null)
  expect(getByText(/You have switched connection/i)).not.toBe(null)
})

test('shows unsuccessful message if connection was unsuccessful', () => {
  // Given
  const frame = {
    type: 'switch-fail',
    activeConnectionData: { host: 'test-host', username: 'test-username' },
    storeCredentials: true
  }
  const activeConnectionData = { authEnabled: true }

  // When
  const { getByText, queryByText } = render(
    <ServerSwitchFrame
      frame={frame}
      activeConnectionData={activeConnectionData}
    />
  )

  // Then
  expect(getByText(/Connection failed/i)).not.toBe(null)
  expect(getByText(/:server connect/i)).not.toBe(null)
  expect(queryByText(frame.activeConnectionData.host)).toBe(null)
  expect(queryByText(frame.activeConnectionData.username)).toBe(null)
  expect(queryByText(/credentials are\s*stored/i)).toBe(null)
})
