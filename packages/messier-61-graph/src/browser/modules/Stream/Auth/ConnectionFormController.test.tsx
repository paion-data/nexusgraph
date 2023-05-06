// Copyright 2023 Paion Data. All rights reserved.
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { ConnectionFormController } from './ConnectionFormController'
import { NATIVE, NO_AUTH } from 'services/bolt/boltHelpers'

test('should print correct state for retaining credentials', async () => {
  const bus = {
    self: jest.fn((_x, _y, cb) => cb({ success: true })),
    send: jest.fn()
  }
  const updateConnection = jest.fn()
  const setActiveConnection = jest.fn()
  const executeInitCmd = jest.fn()
  const host = 'my-host'
  const username = 'my-username'
  let storeCredentials = true // initial default value
  let activeConnectionData = null
  let activeConnection = null
  const frame = {}
  const error = jest.fn()

  // When
  const { rerender, getByText, getByTestId } = render(
    <ConnectionFormController
      frame={frame}
      error={error}
      bus={bus}
      activeConnectionData={activeConnectionData}
      activeConnection={activeConnection}
      storeCredentials={storeCredentials}
      updateConnection={updateConnection}
      setActiveConnection={setActiveConnection}
      executeInitCmd={executeInitCmd}
      isConnected={false}
      allowedSchemes={['neo4j']}
      allowedAuthMethods={[NATIVE, NO_AUTH]}
    />
  )

  // Then form should be there
  expect(getByText(/connect url/i)).toBeDefined()

  // Fill form and click connect
  fireEvent.change(getByTestId('boltaddress'), { target: { value: host } })
  fireEvent.change(getByTestId('username'), { target: { value: username } })
  fireEvent.change(getByTestId('password'), { target: { value: 'xxx' } })
  fireEvent.click(getByTestId('connect'))

  // When faking propagation
  activeConnection = true
  activeConnectionData = {
    username,
    host,
    authEnabled: true
  }
  rerender(
    <ConnectionFormController
      frame={frame}
      bus={bus}
      activeConnectionData={activeConnectionData}
      activeConnection={activeConnection}
      storeCredentials={storeCredentials}
      updateConnection={updateConnection}
      setActiveConnection={setActiveConnection}
      executeInitCmd={executeInitCmd}
      isConnected={true}
      allowedSchemes={['neo4j']}
      allowedAuthMethods={[NATIVE, NO_AUTH]}
    />
  )

  // Then
  expect(getByText(/my-username/i)).toBeDefined()
  expect(getByText(/neo4j:\/\/my-host/i)).toBeDefined()
  expect(
    getByText(/Connection credentials are\sstored in your web browser./i)
  ).toBeDefined()

  // When not storing credentials anymore
  storeCredentials = false
  rerender(
    <ConnectionFormController
      frame={frame}
      bus={bus}
      activeConnectionData={activeConnectionData}
      activeConnection={activeConnection}
      storeCredentials={storeCredentials}
      updateConnection={updateConnection}
      setActiveConnection={setActiveConnection}
      executeInitCmd={executeInitCmd}
      isConnected={true}
      allowedSchemes={['neo4j']}
      allowedAuthMethods={[NATIVE, NO_AUTH]}
    />
  )

  // Then
  expect(getByText(/my-username/i)).toBeDefined()
  expect(getByText(/neo4j:\/\/my-host/i)).toBeDefined()
  expect(
    getByText(/Connection credentials are\snot\sstored in your web browser./i)
  ).toBeDefined()
})
