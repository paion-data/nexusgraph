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
import React, { useEffect, useRef } from 'react'

import { EyeIcon, EyeSlashIcon } from 'browser-components/icons/LegacyIcons'

import {
  StyledConnectionTextInput,
  StyledRevealIconWrapper,
  StyledRevealablePasswordWrapper
} from './styled'

export default function RevealablePasswordInput({
  isRevealed,
  toggleReveal,
  ...props
}: any) {
  const inputRef = useReveal(isRevealed)

  return (
    <StyledRevealablePasswordWrapper>
      <StyledConnectionTextInput ref={inputRef} {...props} />
      <StyledRevealIconWrapper onClick={toggleReveal}>
        {isRevealed ? <EyeIcon /> : <EyeSlashIcon />}
      </StyledRevealIconWrapper>
    </StyledRevealablePasswordWrapper>
  )
}

function useReveal(isRevealed: boolean) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) {
      return
    }

    inputRef.current.type = isRevealed ? 'text' : 'password'
  }, [isRevealed])

  return inputRef
}
