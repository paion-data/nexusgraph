// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { ErrorView } from './ErrorFrame'

describe('ErrorFrame', () => {
  test('displays UndefinedError if no error specified', async () => {
    // Given
    const { getByText } = render(<ErrorView frame={{}} />)

    // Then
    expect(getByText('UndefinedError')).toBeInTheDocument()
  })
  test('does display an error if info provided', () => {
    // Given
    const { getByText } = render(
      <ErrorView
        frame={{
          error: {
            code: 'Test.Error',
            message: 'Test error description'
          }
        }}
      />
    )

    // Then
    expect(getByText('ERROR')).toBeInTheDocument()
    expect(getByText('Test.Error')).toBeInTheDocument()
    expect(getByText('Test error description')).toBeInTheDocument()
  })
  test('does display a known error if only code provided', () => {
    // Given
    const { getByText } = render(
      <ErrorView
        frame={{
          error: {
            code: 'UnknownCommandError',
            cmd: ':unknown-command' // Needed to build error msg
          },
          cmd: ':unknown-command'
        }}
      />
    )

    // Then
    expect(getByText('ERROR')).toBeInTheDocument()
    expect(getByText('UnknownCommandError')).toBeInTheDocument()
    expect(getByText('Unknown command :unknown-command')).toBeInTheDocument()
  })
})
