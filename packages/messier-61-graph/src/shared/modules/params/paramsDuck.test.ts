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
import reducer, * as params from './paramsDuck'
import { dehydrate } from 'services/duckUtils'

describe('paramsDuck', () => {
  test('Finds the reducer', () => {
    expect(reducer).not.toEqual({})
  })

  test('Can add a param to empty state', () => {
    // Given
    const state = {}
    const param = { x: 1 }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(param)
  })

  test('Can add a param to non-empty state', () => {
    // Given
    const state = { y: 2 }
    const param = { x: 1 }
    const expected = { ...state, ...param }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(expected)
  })

  test('Can overwrite a param to non-empty state', () => {
    // Given
    const state = { y: 2 }
    const param = { y: 1 }
    const action = params.update(param)

    // When
    const next = reducer(state, action)

    // Then
    expect(dehydrate(next)).toEqual(param)
  })
})
