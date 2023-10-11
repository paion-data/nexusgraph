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
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { AutoExecButtonComponent } from './auto-exec-button'

const send = jest.fn()

describe('AutoExecButton', function () {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('should display command with cmd char', () => {
    // Given
    const { getByText } = render(
      <AutoExecButtonComponent bus={{ send }} cmd="help params" />
    )

    // Then
    expect(getByText(':help params')).toBeInTheDocument()
    expect(send).not.toHaveBeenCalled()
  })

  test('should auto execute when clicked', () => {
    // Given
    const { getByText } = render(
      <AutoExecButtonComponent bus={{ send }} cmd="help params" />
    )

    fireEvent.click(getByText(':help params'))

    // Then
    expect(getByText(':help params')).toBeInTheDocument()
    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith('commands/COMMAND_QUEUED', {
      cmd: ':help params',
      id: undefined,
      parentId: undefined,
      requestId: undefined,
      type: 'commands/COMMAND_QUEUED',
      source: 'BUTTON',
      isRerun: false,
      useDb: undefined
    })
  })

  test('supports any random cmd string', () => {
    // Given
    const { getByText } = render(
      <AutoExecButtonComponent bus={{ send }} cmd="foo bar" />
    )

    fireEvent.click(getByText(':foo bar'))

    // Then
    expect(getByText(':foo bar')).toBeInTheDocument()
    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith('commands/COMMAND_QUEUED', {
      cmd: ':foo bar',
      id: undefined,
      parentId: undefined,
      requestId: undefined,
      type: 'commands/COMMAND_QUEUED',
      source: 'BUTTON',
      isRerun: false
    })
  })
})
