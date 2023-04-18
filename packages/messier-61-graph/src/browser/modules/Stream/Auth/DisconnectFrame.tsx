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
