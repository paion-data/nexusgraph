// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'
import styled from 'styled-components'

export const StyledSelect = styled.select`
  background-color: #fff;
  border: ${props => props.theme.formButtonBorder};
  border-radius: 4px;
  color: ${props => props.theme.inputText};
  display: block;
  height: 34px;
  font-size: 14px;
  padding: 6px 12px;
  min-width: 120px;
  width: 100%;
`
export const StyledInput = styled.input`
  background-color: #fff;
  border: ${props => props.theme.formButtonBorder};
  border-radius: 4px;
  color: ${props => props.theme.inputText};
  display: block;
  height: 34px;
  font-size: 14px;
  padding: 6px 12px;
  width: 100%;

  &[type='checkbox'] {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    width: auto;
  }
`

export const StyledForm = styled.form`
  width: 100%;
`

export const StyledFormElement = styled.div`
  margin: 0 0 10px 0;
`

export const StyledFormElementWrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`

const StyledSettingTextInput = styled(StyledInput)`
  height: 34px;
  color: #555;
  font-size: 14px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 192px;
`

const StyledCheckbox = styled.input`
  margin-right: 10px;
`
const StyledRadio = styled.input`
  margin-right: 10px;
`
export const StyledLabel = styled.label`
  /* margin-left: 10px; */
  display: inline-block;
  font-weight: 600;
  vertical-align: middle;

  input[type='radio'] + & {
    font-weight: 400;
  }

  &:first-letter {
    text-transform: uppercase;
  }
`
const StyledRadioEntry = styled.div`
  margin: 10px 0;
`

export const CheckboxSelector = (props: any) => (
  <StyledCheckbox type="checkbox" {...props} />
)

type RadioSelectorState = any

export class RadioSelector extends Component<
  { onChange?: any; options: any[]; selectedValue?: string },
  RadioSelectorState
> {
  state: RadioSelectorState = {}
  constructor(props: {} = { options: [] }) {
    super(props as any)
    this.state.selectedValue = this.props.selectedValue || null
  }

  isSelectedValue(option: any) {
    return option === this.state.selectedValue
  }

  render() {
    return (
      <form>
        {this.props.options.map((option: any) => {
          return (
            <StyledRadioEntry key={option}>
              <StyledRadio
                type="radio"
                value={option}
                id={option}
                checked={this.isSelectedValue(option)}
                onChange={event => {
                  this.setState({ selectedValue: option })
                  this.props.onChange(event)
                }}
              />
              <StyledLabel htmlFor={option}>{option}</StyledLabel>
            </StyledRadioEntry>
          )
        })}
      </form>
    )
  }
}
