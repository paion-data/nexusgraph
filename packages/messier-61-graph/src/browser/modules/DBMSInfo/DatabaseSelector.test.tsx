// Copyright 2023 Paion Data. All rights reserved.
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { DatabaseSelector } from './DatabaseSelector'
import { Database } from 'shared/modules/dbMeta/dbMetaDuck'

const testId = 'database-selection-list'

const createDummyDb = (name: string, status = 'online'): Database => ({
  name,
  status,
  address: 'bolt',
  currentStatus: 'online',
  default: false,
  error: '',
  requestedStatus: '',
  role: 'LEADER',
  aliases: [],
  home: false
})

describe('DatabaseSelector', () => {
  it('renders empty if no databases in list', () => {
    // Given
    const databases: Database[] = []

    // When
    const { container } = render(
      <DatabaseSelector selectedDb="" databases={databases} />
    )

    // Then
    expect(container).toMatchInlineSnapshot('<div />')
  })
  it('updates selection in list', () => {
    // Given
    const databases = ['stella', 'molly'].map(n => createDummyDb(n))
    let selected = 'stella'

    // When
    const { getByDisplayValue, queryByDisplayValue, rerender } = render(
      <DatabaseSelector databases={databases} selectedDb={selected} />
    )

    // Then
    expect(getByDisplayValue(/stella/i)).toBeDefined()
    expect(queryByDisplayValue(/molly/i)).toBeNull()

    // When
    selected = 'molly'
    rerender(<DatabaseSelector databases={databases} selectedDb={selected} />)

    // Then
    expect(getByDisplayValue(/molly/i)).toBeDefined()
    expect(queryByDisplayValue(/stella/i)).toBeNull()

    // When
    selected = ''
    rerender(<DatabaseSelector databases={databases} selectedDb={selected} />)

    // Then select db text should be shown
    expect(getByDisplayValue(/select db/i)).toBeDefined()
    expect(queryByDisplayValue(/stella/i)).toBeDefined()
    expect(queryByDisplayValue(/molly/i)).toBeNull()
  })
  it('can handle selections', () => {
    // Given
    const databases = ['stella', 'molly'].map(n => createDummyDb(n))
    const onChange = jest.fn()

    // When
    const { getByTestId } = render(
      <DatabaseSelector
        databases={databases}
        selectedDb=""
        onChange={onChange}
      />
    )
    const select = getByTestId(testId)

    // Select something
    fireEvent.change(select, { target: { value: 'molly' } })

    // Then
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('molly')

    // Select something else
    fireEvent.change(select, { target: { value: 'stella' } })

    // Then
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith('stella')
  })
  it('escapes db names when needed', () => {
    // Given
    const databases = ['regulardb', 'db-with-dash'].map(n => createDummyDb(n))
    const onChange = jest.fn()

    // When
    const { getByTestId } = render(
      <DatabaseSelector
        selectedDb=""
        databases={databases}
        onChange={onChange}
      />
    )
    const select = getByTestId(testId)

    // Select something
    fireEvent.change(select, { target: { value: 'regulardb' } })

    // Then
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('regulardb')

    // Select something else
    fireEvent.change(select, { target: { value: 'db-with-dash' } })

    // Then
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith('`db-with-dash`')
  })
})
