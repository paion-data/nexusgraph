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
import reducer, { APP_START, NAME, getHostedUrl } from './appDuck'

test('reducer stores hostedUrl', () => {
  // Given
  const url = 'xxx'
  const initState: any = {}
  const action = { type: APP_START, url }

  // When
  const state = reducer(initState, action)

  // Then
  expect(state.hostedUrl).toEqual(url)
})

test('selector getHostedUrl returns whats in the store', () => {
  // Given
  const url = 'xxx'
  const initState: any = {}
  const action = { type: APP_START, url }

  // Then
  expect(getHostedUrl({ [NAME]: initState } as any)).toEqual(null)

  // When
  const state = reducer(initState, action)

  // Then
  expect(getHostedUrl({ [NAME]: state } as any)).toEqual(url)
})
