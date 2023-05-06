// Copyright 2023 Paion Data. All rights reserved.
import reducer from './featuresDuck'
import { dehydrate } from 'services/duckUtils'

describe('features reducer', () => {
  test('handles initial value', () => {
    const nextState = reducer(undefined, { type: '' })
    expect(dehydrate(nextState)).toEqual({
      browserSync: true,
      clientConfig: null,
      userCapabilities: {
        serverConfigReadable: false
      }
    })
  })
})
