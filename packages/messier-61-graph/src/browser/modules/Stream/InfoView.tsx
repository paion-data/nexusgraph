// Copyright 2023 Paion Data. All rights reserved.
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
