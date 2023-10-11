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
import reducer, * as currentUser from './currentUserDuck'
import { dehydrate } from 'services/duckUtils'

describe('user reducer current info', () => {
  test('handles unknown action type', () => {
    const action = {
      type: 'UNKNOWN'
    }
    const nextState = reducer(undefined, action)
    expect(dehydrate(nextState)).toEqual({ username: '', roles: [] })
  })
  test('should set info', () => {
    const action = {
      type: currentUser.UPDATE_CURRENT_USER,
      username: 'username',
      roles: ['king']
    }
    const nextState = reducer({ a: 'b' } as any, action)
    expect(nextState).toEqual({ username: 'username', roles: ['king'] })
  })
})

describe('User info actions', () => {
  test('should handle updating current user', () => {
    const username = 'username'
    const roles = 'roles'
    const expectedUser = { username, roles }
    expect(currentUser.updateCurrentUser(username, roles)).toEqual({
      type: currentUser.UPDATE_CURRENT_USER,
      ...expectedUser
    })
  })
})
