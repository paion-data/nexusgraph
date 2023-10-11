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
