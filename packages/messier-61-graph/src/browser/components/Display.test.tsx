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

import Display from './Display'

describe('<Display>', () => {
  test('hides if condition is false', () => {
    // Given
    const val = false

    // When
    const { container } = render(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()
  })
  test('does display if condition is true', () => {
    // Given
    const val = true

    // When
    const { container } = render(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()
  })
  test('shows if condition changes from false to true', () => {
    // Given
    let val = false

    // When
    const { container, rerender } = render(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()

    // When
    val = true
    rerender(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()
  })
  test('hides if condition changes from true to false', () => {
    // Given
    let val = true

    // When
    const { container, rerender } = render(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()

    // When
    val = false
    rerender(
      <Display if={val}>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()
  })
  test('can lazy load if condition changes from false to true and has the lazy prop', () => {
    // Given
    let val = false

    // When
    const { container, rerender } = render(
      <Display if={val} lazy>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()

    // When
    val = true
    rerender(
      <Display if={val} lazy>
        <span>Hello</span>
      </Display>
    )

    // Then
    expect(container).toMatchSnapshot()
  })
})
