// Copyright 2023 Paion Data. All rights reserved.
import { guessSemverVersion } from './featureDuck.utils'

describe('guessSemverVersion', () => {
  const tests: [any, any][] = [
    [, null],
    [null, null],
    ['', null],
    [false, null],
    [true, null],
    ['3.5.3', '3.5.3'],
    ['3.5', '3.5.0'],
    ['3.5-test', '3.5.0'],
    ['4.0-aura', '4.0.0']
  ]

  test.each(tests)(
    'guesses the server version correctly for %s',
    (input, expected) => {
      expect(guessSemverVersion(input)).toEqual(expected)
    }
  )
})
