// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { ServerStatusFrame } from './ServerStatusFrame'

test("shows friendly message on how to connect if you're not connected (empty data)", () => {
  // Given
  const props = {}

  // When
  const { getByText } = render(<ServerStatusFrame {...props} />)

  // Then
  expect(getByText(/You are currently not connected to Neo4j/i)).not.toBe(null)
})

test("shows friendly message on how to connect if you're not connected (populated data)", () => {
  // Given
  const props = {
    activeConnectionData: {
      host: 'test-host',
      username: 'test-username',
      authEnabled: true
    }, // Data not wiped out since last connect
    storeCredentials: true,
    isConnected: false
  }

  // When
  const { getByText } = render(<ServerStatusFrame {...props} />)

  // Then
  expect(getByText(/You are currently not connected to Neo4j/i)).not.toBe(null)
})

test('shows connection info when connected (retain creds)', () => {
  // Given
  const props = {
    activeConnectionData: {
      host: 'test-host',
      username: 'test-username',
      authEnabled: true
    },
    storeCredentials: true,
    isConnected: true
  }

  // When
  const { getByText } = render(<ServerStatusFrame {...props} />)

  // Then
  expect(getByText(/test-username/i)).not.toBe(null)
  expect(getByText(/test-host/i)).not.toBe(null)
  expect(
    getByText(/Connection credentials are\s*stored in your web browser./i)
  ).not.toBe(null)
})

test('shows connection info when connected (no retain creds)', () => {
  // Given
  const props = {
    activeConnectionData: {
      host: 'test-host',
      username: 'test-username',
      authEnabled: true
    },
    storeCredentials: false,
    isConnected: true
  }

  // When
  const { getByText } = render(<ServerStatusFrame {...props} />)

  // Then
  expect(getByText(/test-username/i)).not.toBe(null)
  expect(getByText(/test-host/i)).not.toBe(null)
  expect(
    getByText(/Connection credentials are\s*not\s*stored in your web browser./i)
  ).not.toBe(null)
})
