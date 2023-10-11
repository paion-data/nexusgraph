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
import styled from 'styled-components'

import { CopyIcon } from '../icons/Icons'

type ClipboardCopierProps = {
  textToCopy: string
  iconSize?: number
  titleText?: string
  messageOnSuccess?: string
  messageOnFailure?: string
}
export function ClipboardCopier({
  textToCopy: text,
  iconSize = 16,
  titleText = 'Copy to clipboard',
  messageOnSuccess = '✔️ Copied to clipboard',
  messageOnFailure = 'Copying text failed'
}: ClipboardCopierProps): JSX.Element {
  const [messageToShow, setMessageToShow] = useState<string | null>(null)
  function showPopup(text: string) {
    setMessageToShow(text)
    setTimeout(() => setMessageToShow(null), 1500)
  }

  return (
    <CopyIconContainer
      onClick={() =>
        copyToClipboard(text)
          .then(() => showPopup(messageOnSuccess))
          .catch(() => showPopup(messageOnFailure))
      }
      title={titleText}
    >
      <CopyIcon width={iconSize} />
      {messageToShow && <InfoPopup text={messageToShow} />}
    </CopyIconContainer>
  )
}

const CopyIconContainer = styled.span`
  cursor: pointer;
  position: relative;
  color: ${props => props.theme.frameControlButtonTextColor};
  font-size: 12px;
`

type InfoPopupProps = { text: string }
function InfoPopup({ text }: InfoPopupProps) {
  return <PopupTextContainer> {text} </PopupTextContainer>
}
const PopupTextContainer = styled.span`
  position: absolute;
  white-space: nowrap;
  right: 20px;
  bottom: 0;
  border-radius: 2px;
  background-color: ${props => props.theme.frameSidebarBackground};
  box-shadow: ${props => props.theme.standardShadow};
  color: ${props => props.theme.primaryText}
  font-family: ${props => props.theme.drawerHeaderFontFamily};
  padding: 0 5px;
`

export function copyToClipboard(text: string): Promise<void> {
  // navigator clipboard requires https
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback deprecated method, which requires a textarea
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise<void>((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject()
      textArea.remove()
    })
  }
}
