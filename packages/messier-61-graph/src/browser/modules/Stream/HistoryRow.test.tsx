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

import HistoryRow from './HistoryRow'

describe('HistoryRow', () => {
  test('triggers function on click', () => {
    // Given
    const myFn = jest.fn()
    const entry = ':clear'

    // When
    const { container, getByText } = render(
      <HistoryRow handleEntryClick={myFn} entry={entry} />
    )
    fireEvent.click(getByText(':clear'))

    // Then
    expect(myFn).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
