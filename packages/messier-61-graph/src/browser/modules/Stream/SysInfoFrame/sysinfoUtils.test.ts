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
