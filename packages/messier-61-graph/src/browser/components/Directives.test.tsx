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

/* global MouseEvent */
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { Directives as DirectivesComponent } from './Directives'

describe('Directives', () => {
  test('should attach play topic directive when contents has a play-topic attribute', () => {
    // Given
    const clickEvent = jest.fn()
    const html = <a play-topic="hello">button</a>

    // When
    const { container, getByText } = render(
      <DirectivesComponent content={html} onItemClick={clickEvent} />
    )
    fireEvent(
      getByText('button'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).toHaveBeenCalled()
    expect(clickEvent).toHaveBeenCalledWith(':play hello', true, undefined)
    expect(container).toMatchSnapshot()
  })
  test('should attach help topic directive when contents has a play-topic attribute', () => {
    // Given
    const clickEvent = jest.fn()
    const html = <a help-topic="hello">link</a>

    // When
    const { container, getByText } = render(
      <DirectivesComponent content={html} onItemClick={clickEvent} />
    )
    fireEvent(
      getByText('link'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).toHaveBeenCalled()
    expect(clickEvent).toHaveBeenCalledWith(':help hello', true, undefined)
    expect(container).toMatchSnapshot()
  })
  test('should attach runnable directive when element has a tag of `pre.runnable`', () => {
    // Given
    const clickEvent = jest.fn()
    const html = <pre className="runnable">my code</pre>

    // When
    const { container, getByText } = render(
      <DirectivesComponent content={html} onItemClick={clickEvent} />
    )
    fireEvent(
      getByText('my code'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).toHaveBeenCalled()
    expect(clickEvent).toHaveBeenCalledWith('my code', false, undefined)
    expect(container).toMatchSnapshot()
  })
  test('should attach runnable directive when element has a class name of `.runnable pre`', () => {
    // Given
    const clickEvent = jest.fn()
    const html = (
      <span className="runnable">
        <pre>my code</pre>
      </span>
    )

    // When
    const { container, getByText } = render(
      <DirectivesComponent content={html} onItemClick={clickEvent} />
    )
    fireEvent(
      getByText('my code'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).toHaveBeenCalled()
    expect(clickEvent).toHaveBeenCalledWith('my code', false, undefined)
    expect(container).toMatchSnapshot()
  })
  test('should attach all directives when contents has both attributes in different elements', () => {
    // Given
    const FRAME_ID = 'FRAME_ID'
    const clickEvent = jest.fn()
    const html = (
      <div>
        <a help-topic="help">help</a>
        <a play-topic="play">play</a>
      </div>
    )

    // When
    const { container, getByText } = render(
      <DirectivesComponent
        originFrameId={FRAME_ID}
        content={html}
        onItemClick={clickEvent}
      />
    )
    fireEvent(
      getByText('help'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )
    fireEvent(
      getByText('play'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).toHaveBeenCalledTimes(2)
    expect(clickEvent).toHaveBeenCalledWith(':help help', true, FRAME_ID)
    expect(clickEvent).toHaveBeenCalledWith(':play play', true, FRAME_ID)
    expect(container).toMatchSnapshot()
  })
  test('should not attach any directives when contents does not have any directive attributes', () => {
    // Given
    const clickEvent = jest.fn()
    const html = <a>foobar</a>

    // When
    const { container, getByText } = render(
      <DirectivesComponent content={html} onItemClick={clickEvent} />
    )
    fireEvent(
      getByText('foobar'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true
      })
    )

    // Then
    expect(clickEvent).not.toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
