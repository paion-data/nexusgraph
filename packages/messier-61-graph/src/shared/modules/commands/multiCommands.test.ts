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
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import { createBus, createReduxMiddleware } from 'suber'

import * as commands from './commandsDuck'
import bolt from 'services/bolt/bolt'
import { ADD, add as addFrame } from 'shared/modules/frames/framesDuck'
import { addHistory } from 'shared/modules/history/historyDuck'

// jest.unmock('services/bolt/bolt')
const originalRoutedWriteTransaction = bolt.routedWriteTransaction

const bus = createBus()
const epicMiddleware = createEpicMiddleware(commands.handleCommandEpic)
const mockStore = configureMockStore([
  epicMiddleware,
  createReduxMiddleware(bus)
])

describe('handleCommandEpic', () => {
  let store: any
  const maxHistory = 20
  beforeEach(() => {
    bolt.routedWriteTransaction = originalRoutedWriteTransaction
  })
  beforeAll(() => {
    store = mockStore({
      settings: {
        maxHistory,
        enableMultiStatementMode: true
      },
      history: [':xxx'],
      connections: {},
      params: {},
      grass: {
        node: {
          color: '#000'
        }
      }
    })
  })
  afterEach(() => {
    store.clearActions()
    bus.reset()
  })

  test('listens on COMMAND_QUEUED for cypher a single command and passes on to SINGLE:COMMAND_QUEUED', done => {
    // Given
    const cmd = 'RETURN 1'
    const id = 2
    const requestId = 'xxx'
    const action = commands.executeCommand(cmd, { id, requestId })
    bus.take(commands.SINGLE_COMMAND_QUEUED, () => {
      // Then
      expect(store.getActions()).toEqual([
        action,
        commands.clearErrorMessage(),
        addHistory(action.cmd, maxHistory),
        commands.executeSingleCommand(cmd, { id, requestId })
      ])
      done()
    })
    // When
    store.dispatch(action)

    // Then
    // See snoopOnActions above
  })

  test('listens on COMMAND_QUEUED for cypher a multi commands', done => {
    // Given
    const cmd = ':param x => 1; RETURN $x'
    const id = 2
    const requestId = 'xxx'
    const parentId = 'yyy'
    const action = commands.executeCommand(cmd, {
      id,
      requestId,
      parentId
    })

    bus.take(ADD, () => {
      // Then
      expect(store.getActions()).toContainEqual(action)
      expect(store.getActions()).toContainEqual(
        addHistory(action.cmd, maxHistory)
      )
      expect(store.getActions()).toContainEqual(
        addFrame({
          type: 'cypher-script',
          id: parentId,
          isRerun: false,
          cmd: action.cmd
        } as any)
      )
      // Non deterministic id:s in the commands, so skip
      done()
    })
    // When
    store.dispatch(action)

    // Then
    // See snoopOnActions above
  })
})
