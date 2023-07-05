// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import { StyledShowMoreButton } from "../styles/StyledShowMoreButton.styled";

interface ShowMoreOrAllProps {
  total: number;
  shown: number;
  moreStep: number;
  onMore: (num: number) => void;
}

export function ShowMoreOrAll({ total, shown, moreStep, onMore }: ShowMoreOrAllProps): JSX.Element | null {
  const numMore = Math.min(moreStep, total - shown);
  return shown < total ? (
    <div>
      <StyledShowMoreButton onClick={() => onMore(numMore)}>{`Show ${numMore} more`}</StyledShowMoreButton>
      &nbsp;|&nbsp;
      <StyledShowMoreButton onClick={() => onMore(total)}>{`Show all`}</StyledShowMoreButton>
    </div>
  ) : null;
}
