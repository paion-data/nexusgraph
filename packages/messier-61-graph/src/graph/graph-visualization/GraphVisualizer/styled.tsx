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
import styled from 'styled-components'

export const panelMinWidth = 200

export const StyledFullSizeContainer = styled.div`
  position: relative;
  height: 100%;
`
export const StyledNodeInspectorContainer = styled.div<{
  paneWidth: number
  shouldAnimate: boolean
}>`
  position: absolute;
  right: 8px;
  top: 8px;
  bottom: 8px;
  z-index: 1;
  width: ${props => props.paneWidth}px;
  ${props => props.shouldAnimate && 'transition: 0.2s ease-out;'}
  max-width: 95%;
  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.primaryText};
  font-family: ${props => props.theme.drawerHeaderFontFamily};
  box-shadow: ${props => props.theme.standardShadow};
  overflow: hidden;
`
export const StyledNodeInspectorTopMenuChevron = styled.button<{
  expanded: boolean
}>`
  background-color: ${props => props.theme.frameSidebarBackground};
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 2;
  width: 32px;
  height: 32px;
  padding: 6px;
  color: ${props => props.theme.frameNodePropertiesPanelIconTextColor};
  text-align: center;
  ${props =>
    !props.expanded &&
    `background: ${props.theme.editorBackground};
       box-shadow: ${props.theme.standardShadow};
    `}
`

export const PaneContainer = styled.div<{
  paneWidth: number
}>`
  width: ${props => props.paneWidth}px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
