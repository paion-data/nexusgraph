// Copyright 2023 Paion Data. All rights reserved.
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
