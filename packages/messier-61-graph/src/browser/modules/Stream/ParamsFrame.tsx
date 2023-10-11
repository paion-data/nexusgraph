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

import { ExclamationTriangleIcon } from 'browser-components/icons/LegacyIcons'

import FrameBodyTemplate from '../Frame/FrameBodyTemplate'
import AutoExecButton from './auto-exec-button'
import { ErrorText, PaddedDiv, StyledStatsBar, SuccessText } from './styled'
import Ellipsis from 'browser-components/Ellipsis'
import { applyGraphTypes } from 'services/bolt/boltMappings'
import { stringModifier } from 'services/bolt/cypherTypesFormatting'
import { stringifyMod } from 'services/utils'

const ParamsFrame = ({ frame, isCollapsed, isFullscreen }: any) => {
  const params = applyGraphTypes(frame.params)
  const contents = (
    <PaddedDiv>
      {frame.success !== false && (
        <pre data-testid="rawParamData">
          {stringifyMod(params, stringModifier, true)}
        </pre>
      )}
      <div style={{ marginTop: '20px' }}>
        See <AutoExecButton cmd="help param" /> for usage of the{' '}
        <code>:param</code> command (setting one parameter).
      </div>
      <div style={{ marginTop: '5px' }}>
        See <AutoExecButton cmd="help params" /> for usage of the{' '}
        <code>:params</code> command (setting multiple parameters).
      </div>
    </PaddedDiv>
  )
  const statusBar =
    typeof frame.success === 'undefined' ? null : (
      <StyledStatsBar>
        <Ellipsis>
          {frame.success === true && (
            <SuccessText>Successfully set your parameters.</SuccessText>
          )}
          {frame.success === false && (
            <ErrorText>
              <ExclamationTriangleIcon /> Something went wrong. Read help pages.
            </ErrorText>
          )}
        </Ellipsis>
      </StyledStatsBar>
    )
  return (
    <FrameBodyTemplate
      isCollapsed={isCollapsed}
      isFullscreen={isFullscreen}
      contents={contents}
      statusBar={statusBar}
    />
  )
}
export default ParamsFrame
