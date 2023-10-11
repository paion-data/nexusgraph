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
import styled from 'styled-components'

import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'

const ExecutableIcon = styled.i`
  padding-right: 4px;
`
const ExecutableText = styled.a`
  border-radius: 3px;
  border: 1px solid #dadada;
  display: inline-block;
  font-family: Monaco, 'Courier New', Terminal, monospace;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 0 4px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${props => props.theme.topicBackground};
  color: ${props => props.theme.topicText};
`
export const TextCommand = ({ command, onClick, ...rest }: any) => (
  <ExecutableText {...rest} onClick={() => onClick(`:${command}`)}>
    <ExecutableIcon className="fa fa-play-circle-o" />:{command}
  </ExecutableText>
)

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClick: (cmd: any) =>
      dispatch(executeCommand(cmd, { source: commandSources.button }))
  }
}

export default connect(null, mapDispatchToProps)(TextCommand)
