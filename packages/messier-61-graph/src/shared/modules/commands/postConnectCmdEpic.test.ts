// Copyright 2023 Paion Data. All rights reserved.
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import { createBus, createReduxMiddleware } from 'suber'

import * as commands from './commandsDuck'
import { CONNECTION_SUCCESS } from 'shared/modules/connections/connectionsDuck'
import {
  ClientSettings,
  initialClientSettings,
  UPDATE_SETTINGS
} from '../dbMeta/dbMetaDuck'

describe('postConnectCmdEpic', () => {
  test('creates a SYSTEM_COMMAND_QUEUED if found', done => {
    // Given
    const bus = createBus()
    const epicMiddlewareLocal = createEpicMiddleware(
      commands.postConnectCmdEpic
    )
    const mockStoreLocal = configureMockStore([
      epicMiddlewareLocal,
      createReduxMiddleware(bus)
    ])
    const command = 'play hello'
    const metaSettings: ClientSettings = {
      ...initialClientSettings,
      postConnectCmd: command
    }
    const store = mockStoreLocal({
      settings: {
        playImplicitInitCommands: true
      },
      meta: {
        settings: metaSettings
      }
    })
    const action = { type: CONNECTION_SUCCESS }
    const action2 = { type: UPDATE_SETTINGS }
    bus.take('NOOP', _currentAction => {
      // Then
      expect(store.getActions()).toEqual([
        action,
        action2,
        commands.executeSystemCommand(`:${command}`),
        { type: 'NOOP' }
      ])
      done()
    })

    // When
    store.dispatch(action)
    store.dispatch(action2)
  })
  test('supports multiple commands', done => {
    // Given
    const command1 = 'play hello'
    const command2 = 'play intro'
    const command = `${command1}; ${command2}`
    const bus = createBus()
    const epicMiddlewareLocal = createEpicMiddleware(
      commands.postConnectCmdEpic
    )
    const mockStoreLocal = configureMockStore([
      epicMiddlewareLocal,
      createReduxMiddleware(bus)
    ])

    const metaSettings: ClientSettings = {
      ...initialClientSettings,
      postConnectCmd: command
    }
    const store = mockStoreLocal({
      settings: {
        playImplicitInitCommands: true
      },
      meta: {
        settings: metaSettings
      }
    })
    const action = { type: CONNECTION_SUCCESS }
    const action2 = { type: UPDATE_SETTINGS }
    bus.take('NOOP', _currentAction => {
      // Then
      expect(store.getActions()).toEqual([
        action,
        action2,
        commands.executeSystemCommand(`:${command1}`),
        commands.executeSystemCommand(`:${command2}`),
        { type: 'NOOP' }
      ])
      done()
    })

    // When
    store.dispatch(action)
    store.dispatch(action2)
  })
  test('does nothing if settings not found', done => {
    // Given
    const bus = createBus()
    const epicMiddlewareLocal = createEpicMiddleware(
      commands.postConnectCmdEpic
    )
    const mockStoreLocal = configureMockStore([
      epicMiddlewareLocal,
      createReduxMiddleware(bus)
    ])
    const store = mockStoreLocal({
      settings: {},
      history: {
        history: [':xxx']
      },
      connections: {},
      params: {}
    })
    const action = { type: CONNECTION_SUCCESS }
    const action2 = { type: UPDATE_SETTINGS }
    bus.take('NOOP', _currentAction => {
      // Then
      expect(store.getActions()).toEqual([action, action2, { type: 'NOOP' }])
      done()
    })

    // When
    store.dispatch(action)
    store.dispatch(action2)
  })
})
