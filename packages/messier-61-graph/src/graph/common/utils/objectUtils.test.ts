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
import { deepEquals } from 'neo4j-arc/common'

describe('objectUtils', () => {
  test('can deeply compare objects', () => {
    // Given
    const o1 = { a: 'a', b: 'b', c: { c: 'c' } }
    const o2 = { ...o1 }
    const o3 = { ...o1, c: { c: 'd' } }
    const o4 = { ...o1, d: { e: { f: 'g' } } }
    const o5 = { ...o1, d: { e: { f: 'g' } } }

    // When & Then
    expect(deepEquals(o1, o2)).toBeTruthy()
    expect(deepEquals(o1, o3)).toBeFalsy()
    expect(deepEquals(o4, o5)).toBeTruthy()
  })
  test('deepEquals compares object methods by source instead of by reference', () => {
    const foo1 = { someMethod: () => 'foo' }
    const foo2 = { someMethod: () => 'foo' }
    const bar = { someMethod: () => 'bar' }

    expect(deepEquals(foo1, foo2)).toBeTruthy()
    expect(deepEquals(foo1, bar)).toBeFalsy()
  })
})
