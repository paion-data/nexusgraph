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

import ClickToCode from '../../ClickToCode'
import FrameBodyTemplate from '../../Frame/FrameBodyTemplate'
import ConnectedView from './ConnectedView'
import {
  StyledConnectionAside,
  StyledConnectionBody,
  StyledConnectionBodyContainer
} from './styled'
import { H3 } from 'browser-components/headers'

const connectionFailed = (frame: any) => {
  return frame.type === 'switch-fail'
}

const connectionSuccess = (
  frame: any,
  activeConnectionData: any,
  dynamicConnectionData: any
) => {
  return (
    frame.type === 'switch-success' &&
    activeConnectionData &&
    dynamicConnectionData &&
    dynamicConnectionData.authEnabled
  )
}

export const ServerSwitchFrame = (props: any) => {
  const { frame, activeConnectionData: dynamicConnectionData = {} } = props
  const { activeConnectionData, storeCredentials } = frame
  return (
    <>
      <StyledConnectionAside>
        <span>
          {connectionFailed(frame) && (
            <>
              <H3>Connection failed</H3>
              Could not connect.
            </>
          )}
          {connectionSuccess(
            frame,
            activeConnectionData,
            dynamicConnectionData
          ) && (
            <>
              <H3>Connection updated</H3>
              You have switched connection.
            </>
          )}
        </span>
      </StyledConnectionAside>
      <StyledConnectionBodyContainer>
        {connectionFailed(frame) && (
          <StyledConnectionBody>
            The connection credentials provided could not be used to connect.
            <br />
            Do you have an active graph?
            <br />
            Execute <ClickToCode>:server connect</ClickToCode> to manually enter
            credentials if you have an active graph but the provided credentials
            were wrong.
          </StyledConnectionBody>
        )}
        {connectionSuccess(
          frame,
          activeConnectionData,
          dynamicConnectionData
        ) && (
          <ConnectedView
            host={activeConnectionData && activeConnectionData.host}
            username={activeConnectionData && activeConnectionData.username}
            showHost
            storeCredentials={storeCredentials}
          />
        )}
        {frame.type === 'switch-success' &&
          activeConnectionData &&
          dynamicConnectionData &&
          !dynamicConnectionData.authEnabled && (
            <div>
              <ConnectedView
                host={activeConnectionData && activeConnectionData.host}
                showHost
                hideStoreCredentials
                additionalFooter="You have a working connection with the Neo4j database and server auth is disabled."
              />
            </div>
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
      contents={<ServerSwitchFrame {...props} />}
    />
  )
}

export default Frame
