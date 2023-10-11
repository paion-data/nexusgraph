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

import FrameBodyTemplate from '../Frame/FrameBodyTemplate'
import AutoExecButton from './auto-exec-button'
import { errorMessageFormater } from './errorMessageFormater'
import {
  StyledCypherErrorMessage,
  StyledDiv,
  StyledErrorH4,
  StyledHelpContent,
  StyledHelpDescription,
  StyledHelpFrame,
  StyledPreformattedArea
} from './styled'
import { UnknownCommandError, createErrorObject } from 'services/exceptions'

export const ErrorView = ({ frame }: any) => {
  if (!frame) return null
  const error = frame.error || false
  let errorContents = error.message || 'No error message found'
  const errorCode: string = error.type || error.code || 'UndefinedError'
  if (
    !error.message &&
    errorCode &&
    typeof createErrorObject(errorCode as any, error) !== 'undefined'
  ) {
    const eObj = createErrorObject(errorCode as any, error)
    errorContents = eObj.message
  }
  const fullError = errorMessageFormater(null, errorContents)
  return (
    <StyledHelpFrame>
      <StyledHelpContent>
        <StyledHelpDescription>
          <StyledCypherErrorMessage>ERROR</StyledCypherErrorMessage>
          <StyledErrorH4>{errorCode}</StyledErrorH4>
        </StyledHelpDescription>
        <StyledDiv>
          <StyledPreformattedArea>{fullError.message}</StyledPreformattedArea>
        </StyledDiv>
      </StyledHelpContent>
      {frame.showHelpForCmd ? (
        <>
          Use <AutoExecButton cmd={`help ${frame.showHelpForCmd}`} /> for more
          information.
        </>
      ) : null}
      {errorCode === UnknownCommandError.name ? (
        <>
          Use <AutoExecButton cmd="help commands" /> to list available commands.
        </>
      ) : null}
    </StyledHelpFrame>
  )
}

const ErrorFrame = ({ frame, isFullscreen, isCollapsed }: any) => {
  return (
    <FrameBodyTemplate
      isCollapsed={isCollapsed}
      isFullscreen={isFullscreen}
      contents={<ErrorView frame={frame} />}
    />
  )
}
export default ErrorFrame
