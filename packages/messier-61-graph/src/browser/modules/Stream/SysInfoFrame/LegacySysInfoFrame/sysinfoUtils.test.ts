// Copyright 2023 Paion Data. All rights reserved.

/* global, describe afterEach */
import { flattenAttributes } from './sysinfoUtils'

describe('sysinfo attribute types', () => {
  test('should handle string value', () => {
    const attributeData = { attributes: [{ name: 'foo', value: 'bar' }] }
    expect(flattenAttributes(attributeData)).toEqual({ foo: 'bar' })
  })
  test('should handle int value', () => {
    const attributeData = { attributes: [{ name: 'foo', value: 0 }] }
    expect(flattenAttributes(attributeData)).toEqual({ foo: '0.0' })
  })
  test('should handle object value', () => {
    const attributeData = {
      attributes: [{ name: 'foo', value: { bar: 'baz' } }]
    }
    expect(flattenAttributes(attributeData)).toEqual({ foo: { bar: 'baz' } })
  })
})
