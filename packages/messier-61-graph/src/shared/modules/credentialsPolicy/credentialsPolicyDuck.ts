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
import { parseTimeMillis } from 'services/utils'
import {
  disconnectAction,
  getActiveConnection
} from 'shared/modules/connections/connectionsDuck'
import { credentialsTimeout } from 'shared/modules/dbMeta/dbMetaDuck'
import { USER_INTERACTION } from 'shared/modules/userInteraction/userInteractionDuck'

// Local variables (used in epics)
let timer: any = null

export const NAME = `credentialsPolicy`
export const TRIGGER_CREDENTIALS_TIMEOUT = `${NAME}/TRIGGER_CREDENTIALS_TIMEOUT`
export const triggerCredentialsTimeout = () => {
  return { type: TRIGGER_CREDENTIALS_TIMEOUT }
}

// Epics
export const credentialsTimeoutEpic = (action$: any, store: any) =>
  action$
    .ofType(TRIGGER_CREDENTIALS_TIMEOUT)
    .merge(action$.ofType(USER_INTERACTION))
    .do(() => {
      const cTimeout = parseTimeMillis(credentialsTimeout(store.getState()))
      if (!cTimeout) return clearTimeout(timer)
      clearTimeout(timer)
      timer = setTimeout(() => {
        const activeConnection = getActiveConnection(store.getState())
        if (activeConnection) {
          store.dispatch(disconnectAction(activeConnection))
        }
      }, cTimeout)
    })
    .ignoreElements()
