// Copyright 2023 Paion Data. All rights reserved.
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
