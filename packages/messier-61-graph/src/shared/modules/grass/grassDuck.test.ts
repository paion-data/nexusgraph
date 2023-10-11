// Copyright 2023 Paion Data. All rights reserved.
import reducer, { UPDATE_GRAPH_STYLE_DATA } from './grassDuck'

describe('grass reducer', () => {
  test('handles initial value', () => {
    const nextState = reducer(undefined, { type: '' })
    expect(nextState).toBeNull()
  })
  test('handles UPDATE_GRAPH_STYLE_DATA without initial state', () => {
    const action = {
      type: UPDATE_GRAPH_STYLE_DATA,
      styleData: 'style updated'
    }
    const nextState = reducer(undefined, action)
    expect(nextState).toEqual('style updated')
  })

  test('handles UPDATE_GRAPH_STYLE_DATA', () => {
    const initialState: any = { labels: ['Person'], styleData: 'style' }
    const action = {
      type: UPDATE_GRAPH_STYLE_DATA,
      styleData: 'style updated again'
    }
    const nextState = reducer(initialState, action)
    expect(nextState).toEqual('style updated again')
  })
})
