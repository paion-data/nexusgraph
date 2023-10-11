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
