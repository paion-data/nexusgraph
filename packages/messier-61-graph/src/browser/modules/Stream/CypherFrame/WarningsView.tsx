// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'

import {
  StyledBr,
  StyledCypherErrorMessage,
  StyledCypherMessage,
  StyledCypherWarningMessage,
  StyledDiv,
  StyledH4,
  StyledHelpContent,
  StyledHelpDescription,
  StyledHelpFrame,
  StyledPreformattedArea,
  StyledCode,
  StyledCypherInfoMessage
} from '../styled'
import { deepEquals } from 'neo4j-arc/common'

const getWarningComponent = (severity: any) => {
  if (severity === 'ERROR') {
    return <StyledCypherErrorMessage>{severity}</StyledCypherErrorMessage>
  } else if (severity === 'WARNING') {
    return <StyledCypherWarningMessage>{severity}</StyledCypherWarningMessage>
  } else if (severity === 'INFORMATION') {
    return <StyledCypherInfoMessage>{severity}</StyledCypherInfoMessage>
  } else {
    return <StyledCypherMessage>{severity}</StyledCypherMessage>
  }
}

export class WarningsView extends Component<any> {
  shouldComponentUpdate(props: any) {
    if (!this.props.result) return true
    return !deepEquals(props.result.summary, this.props.result.summary)
  }

  render() {
    if (this.props.result === undefined) return null
    const { summary = {} } = this.props.result
    const { notifications = [], query = {} } = summary
    const { text: cypher = '' } = query
    if (!notifications || !cypher) {
      return null
    }
    const cypherLines = cypher.split('\n')
    const notificationsList = notifications.map((notification: any) => {
      // Detect generic warning without position information
      const position = Object.keys(notification.position).length
        ? notification.position
        : { line: 1, offset: 0 }
      return (
        <StyledHelpContent
          key={notification.title + position.line + position.offset}
        >
          <StyledHelpDescription>
            {getWarningComponent(notification.severity)}
            <StyledH4>{notification.title}</StyledH4>
          </StyledHelpDescription>
          <StyledDiv>
            <StyledHelpDescription>
              {notification.description}
            </StyledHelpDescription>
            <StyledDiv>
              <StyledPreformattedArea>
                {cypherLines[position.line - 1]}
                <StyledBr />
                {Array(position.offset + 1).join(' ')}^
              </StyledPreformattedArea>
            </StyledDiv>
          </StyledDiv>
          <StyledDiv style={{ marginTop: '10px' }}>
            Status code: <StyledCode>{notification.code}</StyledCode>
          </StyledDiv>
        </StyledHelpContent>
      )
    })
    return <StyledHelpFrame>{notificationsList}</StyledHelpFrame>
  }
}

export class WarningsStatusbar extends Component<any> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}
