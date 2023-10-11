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
