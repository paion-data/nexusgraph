// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { InfoIcon, isMac } from '../../../common'

import {
  StyledZoomInfo,
  StyledZoomInfoIconContainer,
  StyledZoomInfoOverlay,
  StyledZoomInfoOverlayDoNotDisplayButton,
  StyledZoomInfoText,
  StyledZoomInfoTextContainer
} from './styled'

const getModKeyString = () => (isMac ? 'Cmd' : 'Ctrl or Shift')

type WheelZoomInfoProps = {
  onDisableWheelZoomInfoMessage: () => void
}
export const WheelZoomInfoOverlay = ({
  onDisableWheelZoomInfoMessage
}: WheelZoomInfoProps) => {
  const handleDoNotDisplayAgainClick = () => {
    onDisableWheelZoomInfoMessage()
  }
  return (
    <StyledZoomInfoOverlay>
      <StyledZoomInfo>
        <StyledZoomInfoTextContainer>
          <StyledZoomInfoIconContainer>
            <InfoIcon />
          </StyledZoomInfoIconContainer>
          <StyledZoomInfoText>{`Use ${getModKeyString()} + scroll to zoom`}</StyledZoomInfoText>
        </StyledZoomInfoTextContainer>
        <StyledZoomInfoOverlayDoNotDisplayButton
          data-testid="wheelZoomInfoCheckbox"
          onClick={handleDoNotDisplayAgainClick}
        >
          {"Don't show again"}
        </StyledZoomInfoOverlayDoNotDisplayButton>
      </StyledZoomInfo>
    </StyledZoomInfoOverlay>
  )
}
