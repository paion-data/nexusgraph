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
import helper from './commandInterpreterHelper'

describe('commandInterpreterHelper', () => {
  describe('discover commands', () => {
    test('should recognize :clear command', () => {
      // Given
      const cmd = 'clear'
      const expectedCommandName = 'clear'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })

    test('should find :config helper with params', () => {
      // Given
      const cmd = 'config cmdchar:"/"'
      const expectedCommandName = 'config'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })

    test('should find :play helper with params', () => {
      // Given
      const cmd = 'play fileLocation'
      const expectedCommandName = 'play'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })

    test('should find :play `url` helper with params', () => {
      // Given
      const cmd = 'play http://neo4j.com'
      const expectedCommandName = 'play-remote'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })

    test('should give the "catch-all" match back with unknown command', () => {
      // Given
      const cmd = 'nomatch'
      const expectedCommandName = 'catch-all'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })

    test('should be case insensitive for browser commands', () => {
      // Given
      const cmd = 'PlaY anyThing'
      const expectedCommandName = 'play'

      // When
      const actualCommandName = helper.interpret(cmd).name

      // Then
      expect(actualCommandName).toEqual(expectedCommandName)
    })
  })
})
