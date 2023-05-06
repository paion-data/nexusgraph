// Copyright 2023 Paion Data. All rights reserved.
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
