// Copyright 2023 Paion Data. All rights reserved.
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
