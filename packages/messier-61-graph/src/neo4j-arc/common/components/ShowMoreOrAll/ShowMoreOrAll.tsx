// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { StyledShowMoreButton } from './styled'

type ShowMoreOrAllProps = {
  total: number
  shown: number
  moreStep: number
  onMore: (num: number) => void
}
export const ShowMoreOrAll = ({
  total,
  shown,
  moreStep,
  onMore
}: ShowMoreOrAllProps) => {
  const numMore = Math.min(moreStep, total - shown)
  return shown < total ? (
    <div>
      <StyledShowMoreButton onClick={() => onMore(numMore)}>
        {`Show ${numMore} more`}
      </StyledShowMoreButton>
      &nbsp;|&nbsp;
      <StyledShowMoreButton onClick={() => onMore(total)}>
        {`Show all`}
      </StyledShowMoreButton>
    </div>
  ) : null
}
