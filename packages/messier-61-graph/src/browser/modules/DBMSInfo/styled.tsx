// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import styled from 'styled-components'

import { PlainPlayIcon } from 'browser-components/icons/LegacyIcons'

export const StyledTable = styled.table``
export const StyledKey = styled.td`
  text-align: right;
  padding-right: 13px;
  width: 100px;
  color: #bcc0c9;
  font-family: ${props => props.theme.primaryFontFamily};
  outline-color: rgb(188, 192, 201);
  text-shadow: rgba(0, 0, 0, 0.4) 0 1px 0;
`
export const StyledValue = styled.td`
  font-family: ${props => props.theme.primaryFontFamily};
`

export const StyledValueUCFirst = styled(StyledValue)`
  &:first-letter {
    text-transform: uppercase;
  }
`

const StyledLink = styled.a`
  cursor: pointer;
  color: #4183c4;
  &:hover {
    color: #bcc0c9;
    text-decoration: none;
  }
`
export const Link = (props: any) => {
  const { children, ...rest } = props
  return (
    <StyledLink {...rest}>
      <PlainPlayIcon />
      &nbsp;
      {children}
    </StyledLink>
  )
}
