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
