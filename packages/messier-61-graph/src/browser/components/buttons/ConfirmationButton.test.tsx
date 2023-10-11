// Copyright 2023 Paion Data. All rights reserved.
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
