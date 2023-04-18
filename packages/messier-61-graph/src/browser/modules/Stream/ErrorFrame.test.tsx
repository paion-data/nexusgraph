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
