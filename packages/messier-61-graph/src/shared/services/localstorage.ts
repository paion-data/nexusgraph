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
import { debounce } from 'lodash-es'
import { Middleware } from 'redux'

import {
  shouldRetainConnectionCredentials,
  shouldRetainEditorHistory
} from '../modules/dbMeta/dbMetaDuck'
import { initialState as settingsInitialState } from '../modules/settings/settingsDuck'
import { GlobalState } from 'shared/globalState'

export const keyPrefix = 'neo4j.'
let storage = window.localStorage

export type LocalStorageKey =
  | 'connections'
  | 'settings'
  | 'history'
  | 'documents'
  | 'folders'
  | 'grass'
  | 'syncConsent'
  | 'udc'
  | 'experimentalFeatures'
  | 'guides'
const keys: LocalStorageKey[] = []

export function getItem(
  key: LocalStorageKey
): GlobalState[LocalStorageKey] | undefined {
  try {
    const serializedVal = storage.getItem(keyPrefix + key)
    if (serializedVal === null) return undefined
    const parsedVal = JSON.parse(serializedVal)
    return parsedVal
  } catch (e) {
    return undefined
  }
}

export function setItem(key: string, val: unknown): boolean {
  try {
    const serializedVal = JSON.stringify(val)
    storage.setItem(keyPrefix + key, serializedVal)
    return true
  } catch (e) {
    return false
  }
}

export function getAll(): Partial<GlobalState> {
  const out: Partial<GlobalState> = {}
  keys.forEach(key => {
    const current = getItem(key)
    if (current !== undefined) {
      if (key === 'settings') {
        out[key] = {
          ...(current as typeof settingsInitialState),
          playImplicitInitCommands: true
        }
      } else {
        Object.assign(out, { [key]: current })
      }
    }
  })
  return out
}

function storeReduxInLocalStorage(state: GlobalState) {
  keys.forEach(key => {
    if (key === 'connections' && !shouldRetainConnectionCredentials(state)) {
      // if browser.retain_connection_credentials is not true, overwrite password value on all connections
      setItem(key, {
        ...state[key],
        connectionsById: Object.assign(
          {},
          ...Object.entries(state[key].connectionsById).map(
            ([id, connection]) => ({
              [id]: {
                ...(connection as Record<string, unknown>),
                password: ''
              }
            })
          )
        )
      })
    } else if (key === 'history' && !shouldRetainEditorHistory(state)) {
      setItem(key, [])
    } else if (key === 'guides') {
      setItem(key, { ...state[key], currentGuide: null })
    } else {
      setItem(key, state[key])
    }
  })
}

const debouncedStore = debounce(storeReduxInLocalStorage, 500, {
  trailing: true,
  maxWait: 1000
})

export function createReduxMiddleware(): Middleware {
  return store => next => action => {
    const result = next(action)
    const state = store.getState() as unknown as GlobalState
    debouncedStore(state)

    return result
  }
}

export function applyKeys(...newKeys: LocalStorageKey[]): void {
  keys.push(...newKeys)
}
export const setStorage = (s: Storage): void => {
  storage = s
}
