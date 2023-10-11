// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import styled from "styled-components";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const SMALL_SIZE = 15;
const LARGE_SIZE = 20;
type IconSize = "large" | "small";
type IconBaseProps = { size?: IconSize };

const getSize = (size?: IconSize) => (size && size === "large" ? LARGE_SIZE : SMALL_SIZE);

const WarningIcon = ({ size }: IconBaseProps): JSX.Element => (
  <ExclamationTriangleIcon width={getSize(size)} height={getSize(size)} />
);

export const StyledWarningMessageWrapper = styled.div`
  color: orange;

  svg {
    display: inline;
  }
`;

interface WarningMessageProps {
  text: string;
}

export const WarningMessage = ({ text }: WarningMessageProps): JSX.Element => {
  return (
    <StyledWarningMessageWrapper>
      <WarningIcon />
      <span>&nbsp;{text}&nbsp;</span>
    </StyledWarningMessageWrapper>
  );
};
