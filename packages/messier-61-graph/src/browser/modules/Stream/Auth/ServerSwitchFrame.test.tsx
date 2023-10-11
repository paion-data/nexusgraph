// Copyright 2023 Paion Data. All rights reserved.
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
