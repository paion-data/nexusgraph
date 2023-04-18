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
import { buildTxFunctionByMode } from './boltHelpers'

const WRITE = 'WRITE'
const READ = 'READ'

describe('buildTxFunctionByMode', () => {
  test('it returns WRITE tx when in WRITE mode', () => {
    // Given
    const fakeSession: any = {
      _mode: WRITE,
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(0)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(1)
  })
  test('it returns READ tx when in READ mode', () => {
    // Given
    const fakeSession: any = {
      _mode: READ,
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(1)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(0)
  })
  test('it by DEFAULT returns tx in WRITE mode', () => {
    // Given
    const fakeSession: any = {
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(0)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(1)
  })
  test('it returns null if no session passed', () => {
    // Given
    const fakeSession = undefined

    // When
    const txFn = buildTxFunctionByMode(fakeSession)

    // Then
    expect(txFn).toBeNull()
  })
})
