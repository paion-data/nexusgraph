// Copyright 2023 Paion Data. All rights reserved.
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
