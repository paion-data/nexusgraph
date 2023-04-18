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
import * as params from './params'
import { replace, update } from 'shared/modules/params/paramsDuck'

jest.mock('services/bolt/bolt', () => ({
  routedWriteTransaction: jest.fn(() => {
    return Promise.resolve({ records: [{ get: () => 2 }] })
  })
}))

describe('commandsDuck params helper', () => {
  test('fails on :param x x x and shows error hint', () => {
    // Given
    const action = { cmd: ':param x x x: 2' }
    const put = jest.fn()

    // When
    return params
      .handleParamsCommand(action, put, false)
      .then(() => {
        throw Error('THIS SHOULD NEVER HAPPEN')
      })
      .catch(error => {
        expect(error.message).toMatch('Error: Syntax error at line 1 col 3:')
        expect(put).not.toHaveBeenCalled()
      })
  })
  test('handles :param "x": 2 and calls the update action creator', () => {
    // Given
    const action = { cmd: ':param "x": 2' }
    const put = jest.fn()

    // When
    const p = params.handleParamsCommand(action, put, false)

    // Then
    return p.then(res => {
      expect(res.result).toEqual({ x: 2 })
      expect(put).toHaveBeenCalledWith(update({ x: 2 }))
    })
  })
  test('handles :param x: 2 and calls the update action creator', () => {
    // Given
    const action = { cmd: ':param x: 2' }
    const put = jest.fn()

    // When
    const p = params.handleParamsCommand(action, put, false)

    // Then
    return p.then(res => {
      expect(res.result).toEqual({ x: 2 })
      expect(put).toHaveBeenCalledWith(update({ x: 2 }))
    })
  })
  test('handles :params {"hej": "ho", "let\'s": "go"} and calls the replace action creator', () => {
    // Given
    const action = { cmd: ':params {"hej": "ho", "let\'s": "go"}' }
    const put = jest.fn()

    // When
    const p = params.handleParamsCommand(action, put, false)

    // Then
    return p.then(res => {
      expect(res.result).toEqual({ hej: 'ho', "let's": 'go' })
      expect(put).toHaveBeenCalledWith(replace({ hej: 'ho', "let's": 'go' }))
    })
  })
  test('handles :params {x: 1, y: 2} and calls the replace action creator', () => {
    // Given
    const action = { cmd: ':params {x: 1, y: 2}' }
    const put = jest.fn()

    // When
    const p = params.handleParamsCommand(action, put, false)

    // Then
    return p.then(res => {
      expect(res.result).toEqual({ x: 1, y: 2 })
      expect(put).toHaveBeenCalledWith(replace({ x: 1, y: 2 }))
    })
  })
  test('handles :params {x: 1, y: 2, z: {a: 3}} and calls the replace action creator', () => {
    // Given
    const action = { cmd: ':params {x: 1, y: 2, z: {a: 3}}' }
    const put = jest.fn()

    // When
    const p = params.handleParamsCommand(action, put, false)

    // Then
    return p.then(res => {
      expect(res.result).toEqual({ x: 1, y: 2, z: { a: 3 } })
      expect(put).toHaveBeenCalledWith(replace({ x: 1, y: 2, z: { a: 3 } }))
    })
  })
  describe('extract key/value from params', () => {
    test('<key>: <value>', () => {
      expect(params.extractParams('foo: bar')).toEqual({
        key: 'foo',
        value: 'bar',
        originalParamValue: 'bar',
        isFn: false
      })
    })
    test('<key with space>: <value>', () => {
      expect(params.extractParams('"f o o": bar')).toEqual({
        key: 'f o o',
        value: 'bar',
        originalParamValue: 'bar',
        isFn: false
      })
    })
  })
})
