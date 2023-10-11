// Copyright 2023 Paion Data. All rights reserved.
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
