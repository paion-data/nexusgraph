// Copyright 2023 Paion Data. All rights reserved.
import reducer, * as actions from './historyDuck'

describe('editor reducer', () => {
  test('handles editor.actionTypes.ADD_HISTORY', () => {
    const helpAction = actions.addHistory(':help', 20)
    const nextState = reducer(undefined, helpAction)
    expect(nextState).toEqual([':help'])

    // One more time
    const historyAction = actions.addHistory(':history', 20)
    const nextnextState = reducer(nextState, historyAction)
    expect(nextnextState).toEqual([':history', ':help'])
  })
  test('editor.actionTypes.ADD_HISTORY does not repeat two entries in a row', () => {
    // Given
    const helpAction = actions.addHistory(':help', 20)
    const historyAction = actions.addHistory(':history', 20)
    const initialState = [':help']

    // When
    const nextState = reducer(initialState, helpAction)

    // Then
    expect(nextState).toEqual([':help'])

    // When
    const nextState1 = reducer(nextState, historyAction)

    // Then
    expect(nextState1).toEqual([':history', ':help'])
  })

  test('takes editor.actionTypes.SET_MAX_HISTORY into account', () => {
    const initialState = [':help', ':help', ':help']

    const helpAction = actions.addHistory(':history', 3)
    const nextState = reducer(initialState, helpAction)
    expect(nextState).toEqual([':history', ':help', ':help'])
  })

  test('handles editor.actionTypes.CLEAR_HISTORY', () => {
    // Given
    const initialState = [':emily']
    const anAction = actions.addHistory(':elliot', 3)
    const state = reducer(initialState, anAction)

    // When
    const nextState = reducer(state, actions.clearHistory())

    // Then
    expect(nextState).toEqual([])
  })
})
