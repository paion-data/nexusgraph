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
import { USER_CLEAR } from '../app/appDuck'
import { GlobalState } from 'shared/globalState'

export const NAME = 'history'
export const ADD = 'history/ADD'
export const CLEAR = 'history/CLEAR'

export const getHistory = (state: GlobalState): string[] => state[NAME]

function addHistoryHelper(
  state: string[],
  newState: string,
  maxHistory: number
) {
  // If it's the same as the last entry, don't add it
  if (state && state.length && state[0] === newState) {
    return state
  }
  const newHistory = [...state]
  newHistory.unshift(newState)
  return newHistory.slice(0, maxHistory)
}

export default function (state: string[] = [], action: any) {
  switch (action.type) {
    case ADD:
      return addHistoryHelper(state, action.state, action.maxHistory)
    case CLEAR:
    case USER_CLEAR:
      return []
    default:
      return state
  }
}

export const addHistory = (state: string, maxHistory: number) => {
  return {
    type: ADD,
    state,
    maxHistory
  }
}
export const clearHistory = () => {
  return {
    type: CLEAR
  }
}
