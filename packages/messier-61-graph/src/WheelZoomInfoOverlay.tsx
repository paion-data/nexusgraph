// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import {
  StyledZoomInfo,
  StyledZoomInfoIconContainer,
  StyledZoomInfoOverlay,
  StyledZoomInfoOverlayDoNotDisplayButton,
  StyledZoomInfoText,
  StyledZoomInfoTextContainer,
} from "./styles/WheelZoomInfoOverlay.styled";

const SMALL_SIZE = 15;
const LARGE_SIZE = 20;

type IconSize = "large" | "small";
interface IconBaseProps {
  size?: IconSize;
}

type WheelZoomInfoProps = {
  onDisableWheelZoomInfoMessage: () => void;
};

const getModKeyString = (): string => (isMac ? "Cmd" : "Ctrl or Shift");

const InfoIcon = ({ size }: IconBaseProps): JSX.Element => {
  return <InformationCircleIcon width={getSize(size)} height={getSize(size)} />;
};
const getSize = (size?: IconSize): number => (size === "large" ? LARGE_SIZE : SMALL_SIZE);

const isMac = /Mac|iPad/.test(navigator.platform);

export function WheelZoomInfoOverlay({ onDisableWheelZoomInfoMessage }: WheelZoomInfoProps): JSX.Element {
  const handleDoNotDisplayAgainClick = (): void => {
    onDisableWheelZoomInfoMessage();
  };
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
  );
}
