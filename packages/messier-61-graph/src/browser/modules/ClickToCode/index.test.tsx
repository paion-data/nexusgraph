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
import { createBus } from 'suber'

import { ClickToCode } from './index'
import { SET_CONTENT } from 'shared/modules/editor/editorDuck'

describe('ClickToCode', () => {
  let bus: any
  beforeEach(() => {
    bus = createBus()
  })
  afterEach(() => {
    bus.reset()
  })
  test('does not render if no children', () => {
    // Given
    const myFn = jest.fn()
    const MyComp = () => <span>yo!</span>

    // When
    bus.take(SET_CONTENT, myFn)
    const { container } = render(
      <ClickToCode CodeComponent={MyComp} bus={bus} />
    )

    // Then
    expect(container).toMatchSnapshot()
    expect(myFn).toHaveBeenCalledTimes(0)
  })
  test('renders if no CodeComponent is provided', () => {
    // Given
    const myFn = jest.fn()

    // When
    bus.take(SET_CONTENT, myFn)
    const { container } = render(<ClickToCode bus={bus} />)

    // Then
    expect(container).toMatchSnapshot()
    expect(myFn).toHaveBeenCalledTimes(0)
  })
  test('renders code as the code when code is available', () => {
    // Given
    const myFn = jest.fn()
    const code = 'my code'

    // When
    bus.take(SET_CONTENT, myFn)
    const { container, getByText } = render(
      <ClickToCode code={code} bus={bus}>
        hello
      </ClickToCode>
    )

    // Then
    expect(container).toMatchSnapshot()
    expect(myFn).toHaveBeenCalledTimes(0)

    // When
    fireEvent.click(getByText('hello'))

    // Then
    expect(myFn).toHaveBeenCalledTimes(1)
    expect(myFn).toHaveBeenCalledWith({ message: code, type: SET_CONTENT })
  })
  test('renders children as code if no code is provided', () => {
    // Given
    const myFn = jest.fn()
    const childrenString = 'hellohi!'

    // When
    bus.take(SET_CONTENT, myFn)
    const { container, getByText } = render(
      <ClickToCode bus={bus}>hellohi!</ClickToCode>
    )

    // Then
    expect(container).toMatchSnapshot()
    expect(myFn).toHaveBeenCalledTimes(0)

    // When
    fireEvent.click(getByText(childrenString))

    // Then
    expect(myFn).toHaveBeenCalledTimes(1)
    expect(myFn).toHaveBeenCalledWith({
      message: childrenString,
      type: SET_CONTENT
    })
  })
  test('renders all children', () => {
    // Given
    const code = 'my code'
    const myFn = jest.fn()
    const children = (
      <div>
        <span>hello</span>
        hi!
      </div>
    )

    // When
    bus.take(SET_CONTENT, myFn)
    const { container, getByText } = render(
      <ClickToCode code={code} bus={bus}>
        {children}
      </ClickToCode>
    )

    // Then
    expect(container).toMatchSnapshot()
    expect(myFn).toHaveBeenCalledTimes(0)

    // When
    fireEvent.click(getByText('hello'))

    // Then
    expect(myFn).toHaveBeenCalledTimes(1)
    expect(myFn).toHaveBeenCalledWith({
      message: code,
      type: SET_CONTENT
    })
  })
})
