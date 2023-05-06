// Copyright 2023 Paion Data. All rights reserved.
import reducer, * as params from './paramsDuck'
import { dehydrate } from 'services/duckUtils'

describe('paramsDuck', () => {
  test('Finds the reducer', () => {
    expect(reducer).not.toEqual({})
  })

  test('Can add a param to empty state', () => {
    // Given
    const state = {}
    const param = { x: 1 }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(param)
  })

  test('Can add a param to non-empty state', () => {
    // Given
    const state = { y: 2 }
    const param = { x: 1 }
    const expected = { ...state, ...param }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(expected)
  })

  test('Can overwrite a param to non-empty state', () => {
    // Given
    const state = { y: 2 }
    const param = { y: 1 }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(param)
  })
})
