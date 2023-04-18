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
