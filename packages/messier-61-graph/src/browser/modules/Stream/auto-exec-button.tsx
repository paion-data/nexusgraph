// Copyright 2023 Paion Data. All rights reserved.
import React, { useCallback } from 'react'
import { withBus } from 'react-suber'
import styled from 'styled-components'

import {
  commandSources,
  executeCommand
} from '../../../shared/modules/commands/commandsDuck'

const StyledAutoExecButton = styled.button`
  border-radius: 3px;
  border: transparent;
  display: inline-block;
  font-family: 'Fira Code', 'Courier New', 'Courier', monospace, 'Monaco',
    'Courier New', Terminal, monospace;
  font-size: 12px;
  line-height: 18px;
  padding: 0 4px;
  color: #5ca6d9;
  cursor: pointer;
  text-decoration: none;
  background-color: ${props => props.theme.runnableBackground};
  outline: transparent;
`

export function AutoExecButtonComponent({
  bus,
  cmd,
  displayText,
  ...rest
}: any) {
  const onClick = useCallback(() => {
    const action = executeCommand(`:${cmd}`, { source: commandSources.button })

    bus.send(action.type, action)
  }, [cmd])

  return (
    <StyledAutoExecButton type="button" onClick={onClick} {...rest}>
      <i className="fa fa-play-circle-o" /> {displayText ?? `:${cmd}`}
    </StyledAutoExecButton>
  )
}

export default withBus(AutoExecButtonComponent)
