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
import { GlobalState } from 'shared/globalState'
import { APP_START } from 'shared/modules/app/appDuck'

export const NAME = 'params'
export const UPDATE_PARAMS = `${NAME}/UPDATE`
const REPLACE = `${NAME}/REPLACE`

const initialState = {}

// Selectors
export const getParams = (state: GlobalState): Record<string, unknown> =>
  state[NAME]

// Reducer
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case APP_START:
      return { ...initialState, ...state }
    case UPDATE_PARAMS:
      return { ...state, ...action.params }
    case REPLACE:
      return { ...action.params }
    default:
      return state
  }
}

// Action creators
export const update = (obj: any) => {
  return {
    type: UPDATE_PARAMS,
    params: obj
  }
}
export const replace = (obj: any) => {
  return {
    type: REPLACE,
    params: obj
  }
}
