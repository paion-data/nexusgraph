// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import { withBus } from 'react-suber'

import { StyledCodeBlock } from './styled'
import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'

const setOnClick = (bus: any, code: any) => {
  code = Array.isArray(code) ? code.join('') : code
  bus.send(SET_CONTENT, setContent(code))
}
const execOnClick = (bus: any, code: any) => {
  const cmd = executeCommand(code, { source: commandSources.button })
  bus.send(cmd.type, cmd)
}

export const ClickToCode = ({
  CodeComponent = StyledCodeBlock,
  bus,
  code,
  execute = false,
  children,
  className,
  ...rest
}: any) => {
  if (!children || children.length === 0) return null
  code = code || children
  const fn = !execute
    ? () => setOnClick(bus, code)
    : () => execOnClick(bus, code)
  return (
    <CodeComponent {...rest} onClick={fn}>
      {children}
    </CodeComponent>
  )
}

export default withBus(ClickToCode)
