// Copyright 2023 Paion Data. All rights reserved.
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
