/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
