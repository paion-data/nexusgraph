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

import { ConfirmationButton } from './ConfirmationButton'

test('ConfirmationButton renders changes state on clicks and finally calls the onConfirmed prop', () => {
  // Given
  const confimred = jest.fn()

  // When
  const { container } = render(<ConfirmationButton onConfirmed={confimred} />)

  // Then
  expect(container).toMatchSnapshot()

  // When
  const initialIcon = container.querySelector(
    '[data-testid="confirmation-button-initial"]'
  )
  fireEvent.click(initialIcon as Element)

  // Then
  expect(container).toMatchSnapshot()

  // When
  const cancelIcon = container.querySelector(
    '[data-testid="confirmation-button-cancel"]'
  )
  fireEvent.click(cancelIcon as Element)

  // Then
  expect(container).toMatchSnapshot()

  // When
  const initialIcon2 = container.querySelector(
    '[data-testid="confirmation-button-initial"]'
  )
  fireEvent.click(initialIcon2 as Element)
  const confirmIcon = container.querySelector(
    '[data-testid="confirmation-button-confirm"]'
  )
  fireEvent.click(confirmIcon as Element)

  // Then
  expect(container).toMatchSnapshot()
  expect(confimred).toHaveBeenCalledTimes(1)
})
