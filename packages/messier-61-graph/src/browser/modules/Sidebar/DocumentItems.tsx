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
import React, { Dispatch, useState } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import styled from 'styled-components'

import {
  HollowPlayIcon,
  SavedScriptsCollapseMenuIcon,
  SavedScriptsExpandMenuRightIcon
} from 'browser-components/icons/LegacyIcons'

import {
  StyledCommand,
  StyledCommandListItem,
  StyledCommandNamePair,
  StyledHelpItem,
  StyledName,
  StyledCommandRunButton,
  StyledCommandRowWrapper,
  FlexSpacer
} from './styled'
import { SavedScriptsFolderCollapseIcon } from 'browser-components/SavedScripts/styled'
import {
  DrawerExternalLink,
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'

const DrawerSubHeaderWithMargin = styled(DrawerSubHeader)`
  margin: 0 24px 0 24px;
`

type DocumentItemsOwnProps = {
  expandable?: true
  header: string
  items: (Link | Command)[]
}

type DocumentItemsProps = DocumentItemsOwnProps & {
  executeCommand: (item: string) => void
}

type Link = {
  name: string
  url: string
}

type Command = {
  name: string
  command: string
}

export const DocumentItems = ({
  expandable,
  header,
  items,
  executeCommand
}: DocumentItemsProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false)

  const listOfItems = items.map(item =>
    'url' in item ? (
      <StyledHelpItem key={item.url}>
        <DrawerExternalLink href={item.url}>{item.name}</DrawerExternalLink>
      </StyledHelpItem>
    ) : (
      <CommandItem
        key={item.command}
        name={item.name}
        command={item.command}
        executeCommand={executeCommand}
      />
    )
  )

  return (
    <DrawerSection>
      <DrawerSubHeaderWithMargin
        onClick={() => expandable && setExpanded(!expanded)}
        style={{ cursor: expandable ? 'pointer' : 'auto' }}
      >
        {expandable && (
          <SavedScriptsFolderCollapseIcon>
            {expanded ? (
              <SavedScriptsCollapseMenuIcon />
            ) : (
              <SavedScriptsExpandMenuRightIcon />
            )}
          </SavedScriptsFolderCollapseIcon>
        )}
        {header}
      </DrawerSubHeaderWithMargin>
      {(!expandable || expanded) && (
        <DrawerSectionBody>
          <ul>{listOfItems}</ul>
        </DrawerSectionBody>
      )}
    </DrawerSection>
  )
}

type CommandItemProps = Command & { executeCommand: (cmd: string) => void }
const CommandItem = ({ name, command, executeCommand }: CommandItemProps) => {
  const [showRunButton, setShowRunButton] = useState(false)

  return (
    <StyledCommandListItem
      onClick={() => executeCommand(command)}
      onMouseEnter={() => setShowRunButton(true)}
      onMouseLeave={() => setShowRunButton(false)}
    >
      <StyledCommandRowWrapper>
        <StyledCommandNamePair>
          <StyledName> {name} </StyledName>
          <StyledCommand> {command} </StyledCommand>
        </StyledCommandNamePair>
        <FlexSpacer />
        <StyledCommandRunButton hidden={!showRunButton}>
          <HollowPlayIcon width={20} />
        </StyledCommandRunButton>
      </StyledCommandRowWrapper>
    </StyledCommandListItem>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  executeCommand: (cmd: string) => {
    dispatch(
      executeCommand(cmd, {
        source: commandSources.sidebar
      })
    )
  }
})

export default connect(null, mapDispatchToProps)(DocumentItems)
