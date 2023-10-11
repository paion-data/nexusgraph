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
import * as utils from './boltscheme.utils'

describe('stripScheme', () => {
  const tests: [any, any][] = [
    [null, ''],
    [undefined, ''],
    ['localhost:7687', 'localhost:7687'],
    ['https://localhost:7687', 'localhost:7687'],
    ['bolt+s://localhost:7687', 'localhost:7687'],
    ['bolt://localhost:7687', 'localhost:7687'],
    ['bolt://localhost:7687/bolt', 'localhost:7687/bolt'],
    [
      'https://localhost:7474?connectUrl=neo4j://localhost:7687',
      'localhost:7474?connectUrl=neo4j://localhost:7687'
    ],
    ['bolt://', '']
  ]

  test.each(tests)('strips the scheme correctly for %s', (input, expected) => {
    expect(utils.stripScheme(input)).toEqual(expected)
  })
})
describe('isSecureBoltScheme', () => {
  const tests: [any, any][] = [
    [null, false],
    [undefined, false],
    ['localhost:7687', false],
    ['https://localhost:7687', false],
    ['bolt+s://localhost:7687', true],
    ['neo4j+s://localhost:7687', true],
    ['bolt://localhost:7687', false],
    ['bolt://localhost:7687/bolt', false],
    ['bolt://localhost:7474?connectUrl=neo4j+s://localhost:7687', false],
    ['bolt+ssc://localhost:7687/bolt', true],
    ['neo4j+ssc://localhost:7687/bolt', true]
  ]

  test.each(tests)(
    'grades the encryption correctly for scheme %s',
    (input, expected) => {
      expect(utils.isSecureBoltScheme(input)).toEqual(expected)
    }
  )
})
describe('getSchemeFlag', () => {
  const tests: [any, any][] = [
    [null, ''],
    [undefined, ''],
    ['localhost:7687', ''],
    ['https://localhost:7687', ''],
    ['bolt+s://localhost:7687', '+s'],
    ['neo4j+s://localhost:7687', '+s'],
    ['bolt://localhost:7687', ''],
    ['bolt://localhost:7687/bolt', ''],
    ['bolt://localhost:7474?connectUrl=neo4j+s://localhost:7687', ''],
    ['bolt+ssc://localhost:7687/bolt', '+ssc'],
    ['neo4j+ssc://localhost:7687/bolt', '+ssc']
  ]

  test.each(tests)(
    'extracts the scheme flags correctly for %s',
    (input, expected) => {
      expect(utils.getSchemeFlag(input)).toEqual(expected)
    }
  )
})
describe('toggleSchemeRouting', () => {
  const tests: [any, any][] = [
    [null, ''],
    [undefined, ''],
    ['localhost:7687', 'localhost:7687'],
    ['https://localhost:7687', 'https://localhost:7687'],
    ['bolt+s://localhost:7687', 'neo4j+s://localhost:7687'],
    ['neo4j+s://localhost:7687', 'bolt+s://localhost:7687'],
    ['bolt://localhost:7687', 'neo4j://localhost:7687'],
    ['bolt://localhost:7687/bolt', 'neo4j://localhost:7687/bolt'],
    [
      'bolt://bolt.com:7474?connectUrl=neo4j+s://localhost:7687',
      'neo4j://bolt.com:7474?connectUrl=neo4j+s://localhost:7687'
    ],
    ['bolt+ssc://localhost:7687/bolt', 'neo4j+ssc://localhost:7687/bolt'],
    ['neo4j+ssc://localhost:7687/bolt', 'bolt+ssc://localhost:7687/bolt']
  ]

  test.each(tests)(
    'toggles routing scheme correctly for %s',
    (input, expected) => {
      expect(utils.toggleSchemeRouting(input)).toEqual(expected)
    }
  )
})
describe('generateBoltUrl', () => {
  const tests: [any, any, any, any][] = [
    // wrong types
    [null, undefined, undefined, 'neo4j://'],
    [undefined, undefined, undefined, 'neo4j://'],
    ['', undefined, undefined, 'neo4j://'],
    [true, undefined, undefined, 'neo4j://'],
    // empty input, but fallback
    ['', ['bolt'], 'bolt', 'bolt://'],
    // loose values
    ['localhost:7687', undefined, undefined, 'neo4j://localhost:7687'],
    ['https://localhost:7687', undefined, undefined, 'https://localhost:7687'],
    // Only allow certain schemas. No fallback.
    [
      'https://localhost:7687',
      ['bolt', 'neo4j'],
      undefined,
      'bolt://localhost:7687'
    ],
    [
      'bolt+s://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      undefined,
      'bolt+s://localhost:7687'
    ],
    [
      'neo4j+s://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      undefined,
      'neo4j+s://localhost:7687'
    ],
    // Flip encryption flag
    [
      'neo4j+s://localhost:7687',
      ['neo4j', 'bolt'],
      undefined,
      'neo4j://localhost:7687'
    ],
    [
      'bolt+s://localhost:7687',
      ['neo4j', 'bolt'],
      undefined,
      'bolt://localhost:7687'
    ],
    [
      'neo4j://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      undefined,
      'neo4j+s://localhost:7687'
    ],
    [
      'bolt://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      undefined,
      'bolt+s://localhost:7687'
    ],
    // Fallback schema
    [
      'localhost:7687',
      ['neo4j+s', 'bolt+s'],
      'bolt+s',
      'bolt+s://localhost:7687'
    ],
    [
      'localhost:7687',
      ['neo4j+s', 'bolt+s'],
      'bolt',
      'neo4j+s://localhost:7687'
    ],
    // encryption flip before fallback
    [
      'neo4j://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      'bolt+s',
      'neo4j+s://localhost:7687'
    ],
    // bolt+routing -> neo4j://
    [
      'bolt+routing://localhost:7687',
      ['neo4j+s', 'bolt+s'],
      'bolt+s',
      'neo4j+s://localhost:7687'
    ],
    [
      'bolt+routing://localhost:7687',
      ['neo4j', 'bolt'],
      'bolt',
      'neo4j://localhost:7687'
    ]
  ]

  test.each(tests)(
    'generates a bolt host correctly for %s',
    (input, allowedSchemes, fallbackScheme, expected) => {
      expect(
        utils.generateBoltUrl(allowedSchemes, input, fallbackScheme)
      ).toEqual(expected)
    }
  )
})
