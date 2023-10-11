// Copyright 2023 Paion Data. All rights reserved.
import { QueryResult } from 'neo4j-driver'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import { createBus, createReduxMiddleware } from 'suber'
import { v4 as uuid } from 'uuid'

import { BoltConnectionError } from '../../services/exceptions'
import { fetchMetaData } from '../dbMeta/dbMetaDuck'
import { update as updateQueryResult } from '../requests/requestsDuck'
import * as commands from './commandsDuck'
import bolt from 'services/bolt/bolt'
import helper from 'services/commandInterpreterHelper'
import { cleanCommand, getInterpreter } from 'services/commandUtils'
import { disconnectAction } from 'shared/modules/connections/connectionsDuck'
import * as frames from 'shared/modules/frames/framesDuck'
import {
  replace as replaceParams,
  update as updateParams
} from 'shared/modules/params/paramsDuck'
import { send } from 'shared/modules/requests/requestsDuck'
import {
  replace as replaceSettings,
  update as updateSettings
} from 'shared/modules/settings/settingsDuck'

jest.mock('shared/services/bolt/boltWorker')

const originalRoutedWriteTransaction = bolt.routedWriteTransaction

const bus = createBus()
const epicMiddleware = createEpicMiddleware(commands.handleSingleCommandEpic)
const mockStore = configureMockStore([
  epicMiddleware,
  createReduxMiddleware(bus)
])

describe('commandsDuck', () => {
  let store: MockStoreEnhanced<unknown, unknown>
  const maxHistory = 20
  beforeEach(() => {
    bolt.routedWriteTransaction = originalRoutedWriteTransaction
  })
  beforeAll(() => {
    store = mockStore({
      settings: {
        maxHistory
      },
      history: [':xxx'],
      connections: {},
      params: {},
      grass: {
        node: {
          color: '#000'
        }
      },
      meta: {},
      requests: {
        xxx: {
          status: 'pending'
        }
      }
    })
  })
  afterEach(() => {
    store.clearActions()
    bus.reset()
  })
  describe('handleSingleCommandEpic', () => {
    test('listens on SINGLE_COMMAND_QUEUED for cypher commands and does a series of things', done => {
      // Given
      const cmd = 'RETURN 1'
      const id = 2
      const requestId = 'xxx'
      const action = commands.executeSingleCommand(cmd, {
        id,
        requestId
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          send(requestId),
          frames.add({ ...action, type: 'cypher' } as any),
          updateQueryResult(requestId, BoltConnectionError(), 'error'),
          commands.unsuccessfulCypher(cmd),
          fetchMetaData(),
          { type: 'NOOP' }
        ])
        done()
      })
      // When
      store.dispatch(action)

      // Then
      // See snoopOnActions above
    })

    test('emtpy SYSTEM_COMMAND_QUEUED gets ignored', done => {
      // Given
      const cmd = ' '
      const action = commands.executeSystemCommand(cmd)
      bus.take('NOOP', () => {
        // Then
        const actions = store.getActions()
        expect(actions[0]).toEqual(action)
        expect(actions[1]).toEqual({ type: 'NOOP' })
        done()
      })
      // When
      store.dispatch(action)
    })

    test('does the right thing for :param x: 2', done => {
      // Given
      const cmd = ':param'
      const cmdString = `${cmd} x: 2`
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })

      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          updateParams({ x: 2 }),
          frames.add({
            ...action,
            success: true,
            type: 'param',
            params: { x: 2 }
          } as any),
          {
            ...updateQueryResult(
              'id',
              { result: { x: 2 }, type: 'param' } as any,
              'success'
            ),
            id: undefined
          },
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })
    test('does the right thing for :param x => 2', done => {
      // Given
      const cmd = ':param'
      const cmdString = `${cmd} x => 2`
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bolt.routedWriteTransaction = jest.fn(
        (_input, _parameters, { requestId }) => [
          requestId ?? uuid(),
          Promise.resolve({
            records: [{ get: (): number => 2 }]
          } as unknown as QueryResult)
        ]
      )

      bus.take('frames/ADD', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          updateParams({ x: 2 }),
          frames.add({
            ...action,
            success: true,
            type: 'param',
            params: { x: 2 }
          } as any)
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })
    test('does the right thing for :params {x: 2, y: 3}', done => {
      // Given
      const cmd = ':params'
      const cmdString = `${cmd} {x: 2, y: 3}`
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          replaceParams({ x: 2, y: 3 }),
          frames.add({
            ...action,
            success: true,
            type: 'params',
            params: {}
          } as any),
          {
            ...updateQueryResult(
              'id',
              { result: { x: 2, y: 3 }, type: 'params' } as any,
              'success'
            ),
            id: undefined
          },
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })
    test('does the right thing for :params', done => {
      // Given
      const cmdString = ':params'
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          frames.add({ ...action, type: 'params', params: {} } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })
    test('does the right thing for :config x: 2', done => {
      // Given
      const cmd = ':config'
      const cmdString = `${cmd} "x": 2`
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          updateSettings({ x: 2 } as any),
          frames.add({
            ...action,
            type: 'pre',
            result: JSON.stringify({ maxHistory: 20 }, null, 2)
          } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })
    test('does the right thing for :config {"x": 2, "y":3}', done => {
      // Given
      const cmd = ':config'
      const cmdString = `${cmd} {"x": 2, "y":3}`
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          replaceSettings({ x: 2, y: 3 } as any),
          frames.add({
            ...action,
            type: 'pre',
            result: JSON.stringify({ maxHistory: 20 }, null, 2)
          } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })

    test('does the right thing for :config', done => {
      // Given
      const cmd = ':config'
      const cmdString = cmd
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          frames.add({
            ...action,
            type: 'pre',
            result: JSON.stringify({ maxHistory: 20 }, null, 2)
          } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })

    test('does the right thing for :style', done => {
      // Given
      const cmd = ':style'
      const cmdString = cmd
      const id = 1
      const action = commands.executeSingleCommand(cmdString, {
        id
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          frames.add({
            ...action,
            type: 'style',
            result: { node: { color: '#000' } }
          } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)

      // Then
      // See above
    })

    test('does the right thing for list queries', done => {
      const cmd = ':queries'
      const id = 1
      const action = commands.executeSingleCommand(cmd, { id })

      bus.take('NOOP', () => {
        expect(store.getActions()).toEqual([
          action,
          frames.add({
            ...action,
            type: 'queries',
            result: "{res : 'QUERIES RESULT'}"
          } as any),
          { type: 'NOOP' }
        ])
        done()
      })

      store.dispatch(action)
    })
    test('does the right thing for cypher with comments', done => {
      // Given
      const comment = '//COMMENT FOR RETURN'
      const actualCommand = 'RETURN 1'
      const cmd = `${comment}\n${actualCommand}`
      const id = 2
      const requestId = 'xxx'
      const action = commands.executeSingleCommand(cmd, {
        id,
        requestId
      })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          send(requestId),
          frames.add({ ...action, type: 'cypher' } as any),
          updateQueryResult(requestId, BoltConnectionError(), 'error'),
          commands.unsuccessfulCypher(cmd),
          fetchMetaData(),
          { type: 'NOOP' }
        ])
        done()
      })
      // When
      store.dispatch(action)
    })
    test('does the right thing for history command with comments', done => {
      // Given
      const cmdString = 'history'
      const cmd = `:${cmdString}`
      const id = 1
      const action = commands.executeSingleCommand(cmd, { id })

      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          getInterpreter(helper.interpret, action.cmd).exec(
            Object.assign(action, { cmd: cleanCommand(action.cmd) }),
            (a: any) => a,
            store
          ),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)
    })
  })
  describe(':server disconnect', () => {
    test(':server disconnect produces a DISCONNECT action and a action for a "disconnect" frame', done => {
      // Given
      const serverCmd = 'disconnect'
      const cmd = `:server ${serverCmd}`
      const action = commands.executeSingleCommand(cmd, { id: '$$discovery' })
      bus.take('NOOP', () => {
        // Then
        expect(store.getActions()).toEqual([
          action,
          frames.add({ ...action, type: 'disconnect' } as any),
          disconnectAction('$$discovery'),
          { type: 'NOOP' }
        ])
        done()
      })

      // When
      store.dispatch(action)
    })
  })
})
