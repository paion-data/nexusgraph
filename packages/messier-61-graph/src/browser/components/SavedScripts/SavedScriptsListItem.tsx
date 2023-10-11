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
import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import { NavIcon } from '../icons/LegacyIcons'

import { RunButton } from './SavedScriptsButton'
import { useCustomBlur, useNameUpdate } from './hooks'
import {
  ContextMenu,
  ContextMenuContainer,
  ContextMenuHoverParent,
  ContextMenuItem,
  SavedScriptsButtonWrapper,
  SavedScriptsInput,
  SavedScriptsListItemDisplayName,
  SavedScriptsListItemMain,
  Separator
} from './styled'
import { getScriptDisplayName } from './utils'
import { Favorite } from 'shared/modules/favorites/favoritesDuck'

interface SavedScriptsListItemProps {
  script: Favorite
  selectScript: () => void
  execScript: () => void
  onClick?: (e: React.MouseEvent) => void
  isSelected: boolean
  renameScript?: (name: string) => void
  removeScript?: () => void
  duplicateScript?: () => void
  clearOtherSelections: () => void
}

function SavedScriptsListItem({
  script,
  selectScript,
  execScript,
  renameScript,
  removeScript,
  duplicateScript,
  onClick,
  isSelected,
  clearOtherSelections
}: SavedScriptsListItemProps): JSX.Element {
  const displayName = getScriptDisplayName(script)
  const {
    isEditing,
    currentNameValue,
    beginEditing,
    doneEditing,
    setNameValue
  } = useNameUpdate(
    displayName,
    () => renameScript && renameScript(currentNameValue)
  )
  const overlayBlurRef = useCustomBlur(() => setShowOverlay(false))
  const dragAndDropRef = useDrag({
    item: { id: script.id, type: 'script' },
    begin: () => {
      if (!isSelected) {
        clearOtherSelections()
      }
    }
  })[1]
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleOverlay = () => setShowOverlay(t => !t)
  const canRunScript = !script.not_executable && !isEditing

  return (
    <ContextMenuHoverParent stayVisible={showOverlay || isSelected}>
      <SavedScriptsListItemMain
        data-testid="savedScriptListItem"
        isSelected={isSelected}
        ref={dragAndDropRef}
        onClick={onClick}
      >
        {isEditing ? (
          <SavedScriptsInput
            type="text"
            autoFocus
            onKeyPress={({ key }) => {
              key === 'Enter' && doneEditing()
            }}
            onBlur={doneEditing}
            value={currentNameValue}
            onChange={e => setNameValue(e.target.value)}
          />
        ) : (
          <SavedScriptsListItemDisplayName
            data-testid={`scriptTitle-${displayName}`}
            onClick={selectScript}
          >
            {displayName}
          </SavedScriptsListItemDisplayName>
        )}
        <SavedScriptsButtonWrapper>
          <ContextMenuContainer
            onClick={toggleOverlay}
            data-testid={`navicon-${displayName}`}
          >
            <NavIcon />
            {showOverlay && (
              <ContextMenu ref={overlayBlurRef}>
                {removeScript && (
                  <ContextMenuItem
                    data-testid="contextMenuDelete"
                    onClick={removeScript}
                  >
                    Delete
                  </ContextMenuItem>
                )}
                {removeScript && <Separator />}
                {renameScript && (
                  <ContextMenuItem
                    data-testid="contextMenuRename"
                    onClick={beginEditing}
                  >
                    Rename
                  </ContextMenuItem>
                )}
                {
                  <ContextMenuItem
                    data-testid="contextMenuEdit"
                    onClick={selectScript}
                  >
                    Edit content
                  </ContextMenuItem>
                }
                {canRunScript && (
                  <ContextMenuItem
                    data-testid="contextMenuRun"
                    onClick={execScript}
                  >
                    Run
                  </ContextMenuItem>
                )}
                {duplicateScript && (
                  <ContextMenuItem
                    data-testid="contextMenuDuplicate"
                    onClick={duplicateScript}
                  >
                    Duplicate
                  </ContextMenuItem>
                )}
              </ContextMenu>
            )}
          </ContextMenuContainer>
          {canRunScript && <RunButton onClick={execScript} />}
        </SavedScriptsButtonWrapper>
      </SavedScriptsListItemMain>
    </ContextMenuHoverParent>
  )
}

export default SavedScriptsListItem
