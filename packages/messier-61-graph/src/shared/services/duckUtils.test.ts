// Copyright 2023 Paion Data. All rights reserved.
import { dehydrate, hydrate } from './duckUtils'

describe('hydrate', () => {
  test('should merge initialState with state when hydrated is undefined', () => {
    // Given
    const initialState = { foo: 0 }
    const state = { bar: 1 }

    // When
    const newState = hydrate(initialState, state)

    // Then
    expect(newState.foo).toEqual(0)
    expect(newState.bar).toEqual(1)
    expect(newState.hydrated).toEqual(true)
  })
  test('should not merge initialState with state when hydrated is true', () => {
    // Given
    const initialState = { foo: 0 }
    const state = { bar: 1, hydrated: true }

    // When
    const newState = hydrate(initialState, state)

    // Then
    expect(newState.foo).toEqual(undefined)
    expect(newState.bar).toEqual(1)
    expect(newState.hydrated).toEqual(true)
  })
})
describe('dehydrate', () => {
  test('should remove hydrated key from state', () => {
    // Given
    const state = { bar: 1, hydrated: true }

    // When
    const newState = dehydrate(state)

    // Then
    expect(newState.hydrated).toEqual(undefined)
  })
})
