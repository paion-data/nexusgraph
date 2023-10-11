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
import React, { PropsWithChildren } from 'react'
import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

const StyleWrapper = styled.div`
  .relatable__toolbar-popup {
    min-width: 250px;
  }

  .relatable__toolbar-value {
    margin: 0 5px 5px 0;
  }

  .relatable__toolbar-popup .relatable__toolbar-popup-button.button {
    box-shadow: none;
  }
`

export function ToolbarPopup({
  children = null,
  content,
  name,
  selectedToolbarAction,
  ...rest
}: PropsWithChildren<any>) {
  const isOpen = selectedToolbarAction && selectedToolbarAction.name === name

  return (
    <Popup
      {...rest}
      on="click"
      open={isOpen}
      style={{ maxWidth: 'none' }}
      position="bottom left"
      trigger={children}
    >
      <StyleWrapper>{content}</StyleWrapper>
    </Popup>
  )
}
