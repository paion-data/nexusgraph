// Copyright 2023 Paion Data. All rights reserved.
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
