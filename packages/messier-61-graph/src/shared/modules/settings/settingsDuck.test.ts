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
import reducer, {
  DISABLE_IMPLICIT_INIT_COMMANDS,
  NAME,
  REPLACE,
  UPDATE,
  getInitCmd
} from './settingsDuck'
import { dehydrate } from 'services/duckUtils'

describe('settings reducer', () => {
  test('handles UPDATE without initial state', () => {
    const action = {
      type: UPDATE,
      state: {
        greeting: 'hello'
      }
    }
    const nextState = reducer(undefined, action)
    expect(nextState.greeting).toEqual('hello')
  })

  test('handles UPDATE', () => {
    const initialState: any = { greeting: 'hello', type: 'human' }
    const action = {
      type: UPDATE,
      state: {
        greeting: 'woff',
        type: 'dog'
      }
    }
    const nextState = dehydrate(reducer(initialState, action))
    expect(nextState.greeting).toEqual('woff')
    expect(nextState.type).toEqual('dog')
  })
  test('handles REPLACE', () => {
    const initialState: any = { greeting: 'hello', type: 'human' }
    const action = {
      type: REPLACE,
      state: {
        new: 'conf'
      }
    }
    const nextState = dehydrate(reducer(initialState, action))
    expect(nextState.greeting).toBeUndefined()
    expect(nextState.type).toBeUndefined()
    expect(nextState).toMatchSnapshot()
  })

  it('defaults playImplicitInitCommands to true', () => {
    expect(reducer(undefined, { type: 'dummy action' })).toEqual(
      expect.objectContaining({ playImplicitInitCommands: true })
    )
  })

  it('sets playImplicitInitCommands to false on DISABLE_IMPLICIT_INIT_COMMANDS', () => {
    expect(
      reducer(undefined, { type: DISABLE_IMPLICIT_INIT_COMMANDS })
    ).toEqual(expect.objectContaining({ playImplicitInitCommands: false }))
  })
})

describe('Selectors', () => {
  test("let getInitCmd be falsy and cast to empty string if that's the case", () => {
    // Given
    const tests = [
      { test: ':play start', expect: ':play start' },
      { test: null, expect: '' },
      { test: undefined, expect: '' },
      { test: '', expect: '' },
      { test: ' ', expect: '' },
      {
        test: '//Todays number is:\nRETURN rand()',
        expect: '//Todays number is:\nRETURN rand()'
      }
    ]

    // When && Then
    tests.forEach(t => {
      const state = {
        [NAME]: { initCmd: t.test }
      }
      expect(getInitCmd(state)).toEqual(t.expect)
    })
  })
})
