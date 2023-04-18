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
