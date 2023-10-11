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
import React from 'react'

import { SpinnerIcon } from 'browser-components/icons/LegacyIcons'

import { SpinnerContainer, StyledBodyMessage } from '../styled'
import Centered from 'browser-components/Centered'
import {
  REQUEST_STATUS_CANCELED,
  REQUEST_STATUS_CANCELING,
  Status
} from 'shared/modules/requests/requestsDuck'

interface CancelViewProps {
  requestStatus: Status
}

export const CancelView = ({ requestStatus }: CancelViewProps): JSX.Element => (
  <Centered>
    <SpinnerContainer>
      {requestStatus === REQUEST_STATUS_CANCELING && <SpinnerIcon />}
    </SpinnerContainer>
    <StyledBodyMessage>
      {requestStatus === REQUEST_STATUS_CANCELING && (
        <div>Terminating active query...</div>
      )}
      {requestStatus === REQUEST_STATUS_CANCELED && <div>Query terminated</div>}
    </StyledBodyMessage>
  </Centered>
)
