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
import React, { Component } from 'react'

import {
  StyledDiv,
  StyledH4,
  StyledHelpContent,
  StyledHelpDescription,
  StyledHelpFrame,
  StyledInfoMessage
} from './styled'

export class InfoView extends Component<any> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { title, description } = this.props
    return (
      <StyledHelpFrame>
        <StyledHelpContent>
          <StyledHelpDescription>
            <StyledInfoMessage>INFO</StyledInfoMessage>
            <StyledH4>{title}</StyledH4>
          </StyledHelpDescription>
          <StyledDiv>
            <StyledHelpDescription>{description}</StyledHelpDescription>
          </StyledDiv>
        </StyledHelpContent>
      </StyledHelpFrame>
    )
  }
}
