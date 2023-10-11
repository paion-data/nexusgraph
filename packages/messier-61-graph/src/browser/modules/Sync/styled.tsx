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
import styled from 'styled-components'

export const ConsentCheckBox = (props: any) => {
  return (
    <StyledP>
      <CheckBoxLabel htmlFor="syncConsentCheckbox">
        <StyledCheckBox
          {...props}
          type="checkbox"
          id="syncConsentCheckbox"
          value="first_checkbox"
        />
        &nbsp; By checking this box you are agreeing to the &nbsp;
        <StyledSimpleLink
          href="http://neo4j.com/terms/neo4j-browser-sync/"
          target="blank"
        >
          Neo4j Browser Sync Terms of Use
        </StyledSimpleLink>
        &nbsp; and our &nbsp;
        <StyledSimpleLink
          href="http://neo4j.com/privacy-policy/"
          target="blank"
        >
          Privacy Policy
        </StyledSimpleLink>
        .
      </CheckBoxLabel>
    </StyledP>
  )
}

export const AlertBox = (props: any) => {
  return (
    <AlertDiv>
      <CloseButton {...props}>×</CloseButton>
      <span>
        Before you can sign in, please check the box above to agree to the terms
        of use and privacy policy.
      </span>
    </AlertDiv>
  )
}

export const ClearLocalConfirmationBox = (props: any) => {
  return (
    <div>
      <AlertP>
        <strong>WARNING</strong>: This WILL erase your data stored in this web
        browsers local storage
      </AlertP>
      <AlertP>
        What do you want to do?
        <br />
        <SmallText>
          (nothing,{' '}
          <StyledSimpleLink onClick={props.onClick}>cancel</StyledSimpleLink>)
        </SmallText>
      </AlertP>
    </div>
  )
}

const StyledP = styled.p``
const StyledCheckBox = styled.input``

const CheckBoxLabel = styled.label`
  display: inline-block;
`

const AlertDiv = styled.div`
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
  padding: 15px;
  display: inline-block;
`

const CloseButton = styled.button`
  float: right;
  vertical-align: top;
  background: transparent;
  border: 0px;
  font-size: 21px;
  outline: 0;
  line-height: 1;
`

const SmallText = styled.span`
  font-size: 85%;
`

export const SmallHeaderText = styled.span`
  font-size: 11px;
`

const AlertP = styled.p`
  margin: 10px;
`

const StyledSimpleLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #5dade2;
    text-decoration: none;
  }
`
