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
import { USER_CLEAR } from 'shared/modules/app/appDuck'
import {
  disconnectAction,
  getActiveConnection
} from 'shared/modules/connections/connectionsDuck'

export const NAME = 'localstorage'
export const CLEAR_LOCALSTORAGE = `${NAME}/CLEAR_LOCALSTORAGE`

// Epics
export const clearLocalstorageEpic = (some$: any, store: any) =>
  some$.ofType(CLEAR_LOCALSTORAGE).map(() => {
    const activeConnection = getActiveConnection(store.getState())
    if (activeConnection) {
      store.dispatch(disconnectAction(activeConnection))
    }
    return { type: USER_CLEAR }
  })
