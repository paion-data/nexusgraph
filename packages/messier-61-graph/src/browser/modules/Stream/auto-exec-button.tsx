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
