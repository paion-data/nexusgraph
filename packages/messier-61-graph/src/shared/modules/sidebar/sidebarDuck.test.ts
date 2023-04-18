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
import reducer, { SidebarState, setDraftScript, toggle } from './sidebarDuck'

describe('sidebarDuck', () => {
  test('should open a drawer when closed', () => {
    const action = toggle('db')

    const nextState = reducer(undefined, action)
    expect(nextState).toEqual({
      drawer: 'db',
      draftScript: null,
      scriptId: null
    })
  })

  test('should switch drawer when a different one already is open', () => {
    const initialState: SidebarState = {
      drawer: 'favorites',
      draftScript: null,
      scriptId: null
    }
    const action = toggle('db')
    const nextState = reducer(initialState, action)
    expect(nextState.drawer).toEqual('db')
  })

  test('should close drawer when the opened one is toggled', () => {
    const initialState: SidebarState = {
      drawer: 'db',
      draftScript: null,
      scriptId: null
    }
    const action = toggle('db')
    const nextState = reducer(initialState, action)
    expect(nextState.drawer).toEqual(null)
  })

  test('should support setting a draft script', () => {
    const action = setDraftScript('test', 'favorites')
    const nextState = reducer(undefined, action)
    expect(nextState.draftScript).toEqual('test')
  })

  test('clears draft script when toggled', () => {
    const action = setDraftScript('test', 'favorites')
    const nextState = reducer(undefined, action)
    expect(nextState.draftScript).toEqual('test')

    const toggleAction = toggle('favorites')
    const lastState = reducer(nextState, toggleAction)
    expect(lastState.draftScript).toEqual(null)
  })
})
