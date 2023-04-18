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
import neo4j from 'neo4j-driver'

import { stringModifier } from 'services/bolt/cypherTypesFormatting'

describe('stringModifier', () => {
  describe('Cypher Types Number modifier only modifies where needed', () => {
    const tests: [number, any][] = [
      [Number(123), '123.0'],
      [Number(123.1), undefined],
      [Number(-123.1), undefined],
      [Number(Infinity), 'Infinity'],
      [Number(-Infinity), '-Infinity'],
      [Number(NaN), 'NaN']
    ]

    test.each(tests)('Modifies %s correctly if needed', (input, output) => {
      expect(stringModifier(input)).toEqual(output)
    })
  })

  describe('handles point value', () => {
    test('where z value is 0', () => {
      const point = new (neo4j.types.Point as any)(1, 1, 2, 0)
      const expectedString = 'point({srid:1, x:1, y:2, z:0})'
      expect(stringModifier(point)).toEqual(expectedString)
    })
  })
})
