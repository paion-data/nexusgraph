// Copyright 2023 Paion Data. All rights reserved.
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
