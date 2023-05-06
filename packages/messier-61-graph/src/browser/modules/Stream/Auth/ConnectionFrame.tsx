// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'

import FrameBodyTemplate from '../../Frame/FrameBodyTemplate'
import FrameError from '../../Frame/FrameError'
import ConnectionForm from './ConnectionFormController'
import { StyledConnectionAside, StyledConnectionBodyContainer } from './styled'
import { Lead } from 'browser-components/Text'
import { H3 } from 'browser-components/headers'
import { BaseFrameProps } from '../Stream'
import { Neo4jError } from 'neo4j-driver'

type ConnectionFrameState = { error: Partial<Neo4jError>; success?: true }
class ConnectionFrame extends Component<BaseFrameProps, ConnectionFrameState> {
  state: ConnectionFrameState = {
    error: {}
  }

  error(e: any) {
    this.setState({ error: e })
  }

  success() {
    this.setState({ success: true })
  }

  render() {
    return (
      <FrameBodyTemplate
        isCollapsed={this.props.isCollapsed}
        isFullscreen={this.props.isFullscreen}
        statusBar={
          <FrameError
            code={this.state.error.code}
            message={this.state.error.message}
          />
        }
        contents={
          <>
            <StyledConnectionAside>
              {this.state.success ? (
                <>
                  <H3>Connected to Neo4j</H3>
                  <Lead>Nice to meet you.</Lead>
                </>
              ) : (
                <>
                  <H3>Connect to Neo4j</H3>
                  <Lead>
                    Database access might require an authenticated connection
                  </Lead>
                </>
              )}
            </StyledConnectionAside>
            <StyledConnectionBodyContainer>
              <ConnectionForm
                {...this.props}
                onSuccess={this.success.bind(this)}
                error={this.error.bind(this)}
              />
            </StyledConnectionBodyContainer>
          </>
        }
      />
    )
  }
}

export default ConnectionFrame
