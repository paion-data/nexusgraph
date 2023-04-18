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

import Accordion from './Accordion'

describe('<Accordion>', () => {
  test('does not open any content by default and toggles content on title click', () => {
    // Given
    const renderProp = ({ getChildProps }: any) => {
      const p0 = getChildProps({ index: 0 })
      const p1 = getChildProps({ index: 1 })
      return (
        <div>
          <Accordion.Title {...p0.titleProps}>First</Accordion.Title>
          <Accordion.Content {...p0.contentProps}>
            First Content
          </Accordion.Content>
          <Accordion.Title {...p1.titleProps}>Second</Accordion.Title>
          <Accordion.Content {...p1.contentProps}>
            Second Content
          </Accordion.Content>
        </div>
      )
    }
    // When
    const { getByText, queryByText } = render(<Accordion render={renderProp} />)

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(queryByText('First Content')).toBeNull()
    expect(queryByText('Second Content')).toBeNull()

    // When
    fireEvent.click(getByText('First'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(queryByText('Second Content')).toBeNull()

    // When
    fireEvent.click(getByText('Second'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(queryByText('First Content')).toBeNull()
    expect(getByText('Second Content')).toBeInTheDocument()

    // When
    fireEvent.click(getByText('Second'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(queryByText('First Content')).toBeNull()
    expect(queryByText('Second Content')).toBeNull()
  })

  test('can have content panes open by default and works as usual after that', () => {
    // Given
    const renderProp = ({ getChildProps }: any) => {
      const p0 = getChildProps({ index: 0, defaultActive: true })
      const p1 = getChildProps({ index: 1 })
      const p2 = getChildProps({ index: 2, defaultActive: true })
      return (
        <div>
          <Accordion.Title {...p0.titleProps}>First</Accordion.Title>
          <Accordion.Content {...p0.contentProps}>
            First Content
          </Accordion.Content>
          <Accordion.Title {...p1.titleProps}>Second</Accordion.Title>
          <Accordion.Content {...p1.contentProps}>
            Second Content
          </Accordion.Content>
          <Accordion.Title {...p2.titleProps}>Third</Accordion.Title>
          <Accordion.Content {...p2.contentProps}>
            Third Content
          </Accordion.Content>
        </div>
      )
    }

    // When
    const { getByText, queryByText } = render(<Accordion render={renderProp} />)

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(queryByText('Second Content')).toBeNull()
    expect(getByText('Third Content')).toBeInTheDocument()

    // When
    fireEvent.click(getByText('First'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(queryByText('First Content')).toBeNull()
    expect(queryByText('Second Content')).toBeNull()
    expect(queryByText('Third Content')).toBeNull()

    // When
    fireEvent.click(getByText('Second'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(queryByText('First Content')).toBeNull()
    expect(getByText('Second Content')).toBeInTheDocument()
    expect(queryByText('Third Content')).toBeNull()
  })

  test('can have content panes always open', () => {
    // Given
    const renderProp = ({ getChildProps }: any) => {
      const p0 = getChildProps({ index: 0, forceActive: true })
      const p1 = getChildProps({ index: 1 })
      const p2 = getChildProps({ index: 2, forceActive: true })
      return (
        <div>
          <Accordion.Title {...p0.titleProps}>First</Accordion.Title>
          <Accordion.Content {...p0.contentProps}>
            First Content
          </Accordion.Content>
          <Accordion.Title {...p1.titleProps}>Second</Accordion.Title>
          <Accordion.Content {...p1.contentProps}>
            Second Content
          </Accordion.Content>
          <Accordion.Title {...p2.titleProps}>Third</Accordion.Title>
          <Accordion.Content {...p2.contentProps}>
            Third Content
          </Accordion.Content>
        </div>
      )
    }

    // When
    const { getByText, queryByText } = render(<Accordion render={renderProp} />)

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(queryByText('Second Content')).toBeNull()
    expect(getByText('Third Content')).toBeInTheDocument()

    // When
    // Click a closed title does not close the forced opened
    fireEvent.click(getByText('Second'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(getByText('Second Content')).toBeInTheDocument()
    expect(getByText('Third Content')).toBeInTheDocument()

    // When
    // Click a forced opened does not do anything
    fireEvent.click(getByText('First'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(getByText('Second Content')).toBeInTheDocument()
    expect(getByText('Third Content')).toBeInTheDocument()

    // When
    // Click a open non-forced opened closes itself
    fireEvent.click(getByText('Second'))

    // Then
    expect(getByText('First')).toBeInTheDocument()
    expect(getByText('Second')).toBeInTheDocument()
    expect(getByText('Third')).toBeInTheDocument()
    expect(getByText('First Content')).toBeInTheDocument()
    expect(queryByText('Second Content')).toBeNull()
    expect(getByText('Third Content')).toBeInTheDocument()
  })
})
