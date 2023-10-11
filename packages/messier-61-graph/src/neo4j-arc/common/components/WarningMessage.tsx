// Copyright 2023 Paion Data. All rights reserved.
import { WarningIcon } from '../icons/Icons'
import React from 'react'
import styled from 'styled-components'

export const StyledWarningMessageWrapper = styled.div`
  color: orange;

  svg {
    display: inline;
  }
`

type WarningMessageProps = {
  text: string
}
export const WarningMessage = ({ text }: WarningMessageProps): JSX.Element => {
  return (
    <StyledWarningMessageWrapper>
      <WarningIcon />
      <span>&nbsp;{text}&nbsp;</span>
    </StyledWarningMessageWrapper>
  )
}
