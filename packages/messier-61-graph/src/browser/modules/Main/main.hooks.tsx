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
import { useEffect, useState } from 'react'

import {
  CONNECTING_STATE,
  PENDING_STATE
} from 'shared/modules/connections/connectionsDuck'

const FIVE_SECONDS = 5 * 1000
const TEN_SECONDS = 10 * 1000

export function useSlowConnectionState({
  connectionState,
  errorMessage,
  lastConnectionUpdate
}: {
  connectionState: number
  errorMessage?: string
  lastConnectionUpdate: number
}): [boolean, boolean] {
  const [past5Sec, setPast5Sec] = useState(false)
  const [past10Sec, setPast10Sec] = useState(false)

  useEffect(() => {
    const shouldTimeConnection =
      [CONNECTING_STATE, PENDING_STATE].includes(connectionState) &&
      !errorMessage

    if (!shouldTimeConnection) {
      setPast5Sec(false)
      setPast10Sec(false)

      return
    }

    const timeout5Sec = setTimeout(() => {
      const diff = Date.now() - lastConnectionUpdate

      setPast5Sec(diff > FIVE_SECONDS)
    }, FIVE_SECONDS)

    const timeout10Sec = setTimeout(() => {
      const diff = Date.now() - lastConnectionUpdate

      setPast10Sec(diff > TEN_SECONDS)
    }, TEN_SECONDS)

    return () => {
      clearTimeout(timeout5Sec)
      clearTimeout(timeout10Sec)
    }
  }, [connectionState, lastConnectionUpdate, errorMessage])

  return [past5Sec, past10Sec]
}
