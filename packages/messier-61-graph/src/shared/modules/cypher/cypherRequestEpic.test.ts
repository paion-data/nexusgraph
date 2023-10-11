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

import { CYPHER_REQUEST, cypherRequestEpic } from './cypherDuck'
import {
  getUserTxMetadata,
  NEO4J_BROWSER_USER_QUERY,
  userDirectTxMetadata
} from 'services/bolt/txMetadata'

jest.mock('services/bolt/bolt', () => {
  const orig = jest.requireActual('services/bolt/bolt')
  return {
    ...orig,
    directTransaction: jest.fn(() => Promise.resolve({ records: [] }))
  }
})
const bolt = jest.requireMock('services/bolt/bolt')

jest.mock('shared/modules/dbMeta/dbMetaDuck')
const dbMeta = jest.requireMock('shared/modules/dbMeta/dbMetaDuck')

describe('cypherRequestEpic', () => {
  let store: any
  const bus = createBus()
  const epicMiddleware = createEpicMiddleware(cypherRequestEpic)
  const mockStore = configureMockStore([
    epicMiddleware,
    createReduxMiddleware(bus)
  ])
  beforeAll(() => {
    store = mockStore({
      settings: {}
    })
  })
  afterEach(() => {
    bus.reset()
    store.clearActions()
  })

  test('cypherRequestEpic passes along tx metadata if a queryType exists on action', () => {
    // Given
    dbMeta.getRawVersion.mockImplementation(() => '5.0.0') // has tx support
    const action = {
      type: CYPHER_REQUEST,
      query: 'RETURN 1',
      queryType: NEO4J_BROWSER_USER_QUERY,
      $$responseChannel: 'test-1'
    }

    const p = new Promise<void>((resolve, reject) => {
      bus.take(action.$$responseChannel, () => {
        // Then
        try {
          expect(bolt.directTransaction).toHaveBeenCalledTimes(1)
          expect(bolt.directTransaction).toHaveBeenCalledWith(
            action.query,
            undefined,
            userDirectTxMetadata
          )
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })

    // When
    store.dispatch(action)

    // Return
    return p
  })
  test('cypherRequestEpic handles actions without queryType', () => {
    // Given
    bolt.directTransaction.mockClear()
    dbMeta.getRawVersion.mockImplementation(() => '5.0.0') // Has tx metadata support

    // No queryType = no tx metadata
    const action = {
      type: CYPHER_REQUEST,
      query: 'RETURN 1',
      $$responseChannel: 'test-1'
    }

    const p = new Promise<void>((resolve, reject) => {
      bus.take(action.$$responseChannel, () => {
        // Then
        try {
          expect(bolt.directTransaction).toHaveBeenCalledTimes(1)
          expect(bolt.directTransaction).toHaveBeenCalledWith(
            action.query,
            undefined,
            getUserTxMetadata()
          )
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })

    // When
    store.dispatch(action)

    // Return
    return p
  })
})
