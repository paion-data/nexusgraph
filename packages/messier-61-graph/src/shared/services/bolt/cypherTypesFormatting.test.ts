// Copyright 2023 Paion Data. All rights reserved.
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
