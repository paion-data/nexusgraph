// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import FrameBodyTemplate from '../../Frame/FrameBodyTemplate'
import { StyledConnectionAside } from './styled'
import { Lead } from 'browser-components/Text'
import { H3 } from 'browser-components/headers'

const Disconnect = ({
  activeConnectionData,
  isCollapsed,
  isFullscreen
}: any) => {
  return (
    <FrameBodyTemplate
      isCollapsed={isCollapsed}
      isFullscreen={isFullscreen}
      contents={
        <StyledConnectionAside>
          {activeConnectionData ? (
            <div>
              <H3>Connected</H3>
              <Lead>You're still connected</Lead>
            </div>
          ) : (
            <div>
              <H3>Disconnected</H3>
              <Lead>You are disconnected from the server</Lead>
            </div>
          )}
        </StyledConnectionAside>
      }
    />
  )
}

export default Disconnect
