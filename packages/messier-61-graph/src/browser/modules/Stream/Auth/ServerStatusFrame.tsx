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
import { connect } from 'react-redux'

import FrameBodyTemplate from '../../Frame/FrameBodyTemplate'
import ConnectedView from './ConnectedView'
import {
  StyledConnectionAside,
  StyledConnectionBody,
  StyledConnectionBodyContainer
} from './styled'
import { H3 } from 'browser-components/headers'
import { ClickToCode } from 'browser/modules/ClickToCode/index'
import {
  getActiveConnection,
  getActiveConnectionData,
  isConnected
} from 'shared/modules/connections/connectionsDuck'
import { shouldRetainConnectionCredentials } from 'shared/modules/dbMeta/dbMetaDuck'

export const ServerStatusFrame = (props: any) => {
  const { activeConnectionData, storeCredentials, isConnected } = props

  return (
    <>
      <StyledConnectionAside>
        <span>
          <H3>Connection status</H3>
          This is your current connection information.
        </span>
      </StyledConnectionAside>
      <StyledConnectionBodyContainer>
        {(!isConnected || !activeConnectionData) && (
          <StyledConnectionBody>
            You are currently not connected to Neo4j.
            <br />
            Execute <ClickToCode>:server connect</ClickToCode> and enter your
            credentials to connect.
          </StyledConnectionBody>
        )}
        {isConnected &&
          activeConnectionData &&
          activeConnectionData.authEnabled && (
            <ConnectedView
              username={activeConnectionData && activeConnectionData.username}
              showHost
              host={activeConnectionData && activeConnectionData.host}
              storeCredentials={storeCredentials}
            />
          )}
        {isConnected &&
          activeConnectionData &&
          !activeConnectionData.authEnabled && (
            <StyledConnectionBody>
              You have a working connection and server auth is disabled.
            </StyledConnectionBody>
          )}
      </StyledConnectionBodyContainer>
    </>
  )
}

const Frame = (props: any) => {
  return (
    <FrameBodyTemplate
      isCollapsed={props.isCollapsed}
      isFullscreen={props.isFullscreen}
      contents={<ServerStatusFrame {...props} />}
    />
  )
}

const mapStateToProps = (state: any) => {
  return {
    activeConnection: getActiveConnection(state),
    activeConnectionData: getActiveConnectionData(state),
    storeCredentials: shouldRetainConnectionCredentials(state),
    isConnected: isConnected(state)
  }
}

export default connect(mapStateToProps, null)(Frame)
