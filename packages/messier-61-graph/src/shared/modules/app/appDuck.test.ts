// Copyright 2023 Paion Data. All rights reserved.
import reducer, { APP_START, NAME, getHostedUrl } from './appDuck'

test('reducer stores hostedUrl', () => {
  // Given
  const url = 'xxx'
  const initState: any = {}
  const action = { type: APP_START, url }

  // When
  const state = reducer(initState, action)

  // Then
  expect(state.hostedUrl).toEqual(url)
})

test('selector getHostedUrl returns whats in the store', () => {
  // Given
  const url = 'xxx'
  const initState: any = {}
  const action = { type: APP_START, url }

  // Then
  expect(getHostedUrl({ [NAME]: initState } as any)).toEqual(null)

  // When
  const state = reducer(initState, action)

  // Then
  expect(getHostedUrl({ [NAME]: state } as any)).toEqual(url)
})
