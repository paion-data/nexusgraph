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
import { dehydrate, hydrate } from './duckUtils'

describe('hydrate', () => {
  test('should merge initialState with state when hydrated is undefined', () => {
    // Given
    const initialState = { foo: 0 }
    const state = { bar: 1 }

    // When
    const newState = hydrate(initialState, state)

    // Then
    expect(newState.foo).toEqual(0)
    expect(newState.bar).toEqual(1)
    expect(newState.hydrated).toEqual(true)
  })
  test('should not merge initialState with state when hydrated is true', () => {
    // Given
    const initialState = { foo: 0 }
    const state = { bar: 1, hydrated: true }

    // When
    const newState = hydrate(initialState, state)

    // Then
    expect(newState.foo).toEqual(undefined)
    expect(newState.bar).toEqual(1)
    expect(newState.hydrated).toEqual(true)
  })
})
describe('dehydrate', () => {
  test('should remove hydrated key from state', () => {
    // Given
    const state = { bar: 1, hydrated: true }

    // When
    const newState = dehydrate(state)

    // Then
    expect(newState.hydrated).toEqual(undefined)
  })
})
