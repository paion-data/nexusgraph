// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledHeaderText = styled.div`
  font-family: ${props => props.theme.drawerHeaderFontFamily};
  color: white;
`

const StyledInputField = styled.input`
  height: 25px;
  width: 140px;
`

const StyledSubmitButton = styled.button`
  color: #fff;
  background-color: #428bca;
  border: none;
  border-radius: 3px;
  padding: 3px;
  font-weight: 500;
  font-size: 14px;
  height: 25px;
  margin: 5px 0 0 5px;
`

const StyledCancelButton = styled.button`
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 3px;
  padding: 3px;
  font-weight: 500;
  font-size: 14px;
  height: 25px;
  margin: 5px 0 0 5px;
`

const StyledSaveArea = styled.form`
  color: black;
  padding-left: 25px;
  margin-bottom: 20px;
`

interface NewSavedScriptProps {
  onSubmit: (name: string) => void
  onCancel: () => void
  defaultName: string
  headerText: string
  pattern?: string
  patternMessage?: string
}

function NewSavedScript({
  onSubmit,
  defaultName,
  headerText,
  onCancel,
  patternMessage = '',
  pattern
}: NewSavedScriptProps): JSX.Element {
  const [name, setName] = useState(defaultName)

  function formSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(name)
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <StyledSaveArea onSubmit={formSubmit}>
      <StyledHeaderText> {headerText} </StyledHeaderText>
      <StyledInputField
        data-testid="scriptName"
        value={name}
        onChange={onChange}
        pattern={pattern}
        title={patternMessage}
        required
      />
      <StyledSubmitButton data-testid="saveScript" type="submit">
        Save
      </StyledSubmitButton>
      <StyledCancelButton onClick={onCancel} type="button">
        Cancel
      </StyledCancelButton>
    </StyledSaveArea>
  )
}

export default NewSavedScript
