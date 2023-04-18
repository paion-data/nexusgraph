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
import React, { Component } from 'react'

import RevealablePasswordInput from './revealable-password-input'
import {
  StyledChangePasswordForm,
  StyledConnectionFormEntry,
  StyledConnectionLabel,
  StyledConnectionTextInput
} from './styled'
import { getRandomWords } from './utils'
import InputEnterStepping from 'browser-components/InputEnterStepping/InputEnterStepping'
import { FormButton } from 'browser-components/buttons'

type State = any

export default class ChangePasswordForm extends Component<any, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      password: '',
      newPassword: '',
      newPassword2: '',
      revealNewPassword: false
    }
  }

  onExistingPasswordChange = (event: any) => {
    const password = event.target.value
    this.setState({ password }, () => this.props.onChange())
  }

  onNewPasswordChange = (event: any) => {
    const newPassword = event.target.value
    this.setState({ newPassword }, () => this.props.onChange())
  }

  onNewPasswordChange2 = (event: any) => {
    const newPassword2 = event.target.value
    this.setState({ newPassword2 }, () => this.props.onChange())
  }

  onSuggestPassword = () => {
    const suggestedPassword = `${getRandomWords(5).join('-')}-${Math.floor(
      Math.random() * 10000
    )}`
    this.setState({
      newPassword: suggestedPassword,
      newPassword2: suggestedPassword,
      revealNewPassword: true
    })
  }

  togglePasswordRevealed = () =>
    this.setState((state: any) => ({
      revealNewPassword: !state.revealNewPassword
    }))

  validateSame = () => {
    if (
      this.state.newPassword &&
      this.state.newPassword !== '' &&
      this.state.newPassword !== this.state.newPassword2
    ) {
      return this.props.onChangePasswordClick({
        error: {
          code: 'Mismatch',
          message: 'The two entered passwords must be the same.'
        }
      })
    }

    if (this.props.showExistingPasswordInput && this.props.tryConnect) {
      this.props.tryConnect(this.state.password, (res: any) => {
        if (res.success) {
          this.props.onChangePasswordClick({
            newPassword: this.state.newPassword
          })
        } else {
          this.props.onChangePasswordClick(res)
        }
      })
    } else {
      this.props.onChangePasswordClick({
        newPassword: this.state.newPassword
      })
    }
  }

  render() {
    const indexStart = this.props.showExistingPasswordInput ? 1 : 0
    const { isLoading } = this.props
    const classNames = []
    if (isLoading) {
      classNames.push('isLoading')
    }
    return (
      <StyledChangePasswordForm className={classNames.join(' ')}>
        <InputEnterStepping
          steps={this.props.showExistingPasswordInput ? 3 : 2}
          submitAction={this.validateSame}
          render={({
            getSubmitProps,
            getInputPropsForIndex,
            setRefForIndex
          }: any) => {
            return (
              <>
                {this.props.showExistingPasswordInput && (
                  <StyledConnectionFormEntry>
                    <StyledConnectionLabel>
                      Existing password
                    </StyledConnectionLabel>
                    <StyledConnectionTextInput
                      {...getInputPropsForIndex(0, {
                        initialFocus: true,
                        type: 'password',
                        onChange: this.onExistingPasswordChange,
                        value: this.state.password,
                        ref: (ref: any) => setRefForIndex(0, ref),
                        disabled: isLoading,
                        autoComplete: 'off'
                      })}
                    />
                  </StyledConnectionFormEntry>
                )}
                <StyledConnectionFormEntry>
                  <StyledConnectionLabel>New password</StyledConnectionLabel>
                  <RevealablePasswordInput
                    {...getInputPropsForIndex(indexStart, {
                      initialFocus: !this.props.showExistingPasswordInput,
                      'data-testid': 'newPassword',
                      type: 'password',
                      onChange: this.onNewPasswordChange,
                      value: this.state.newPassword,
                      setRef: (ref: any) => setRefForIndex(indexStart, ref),
                      disabled: isLoading,
                      isRevealed: this.state.revealNewPassword,
                      toggleReveal: this.togglePasswordRevealed,
                      autoComplete: 'new-password'
                    })}
                  />
                  &nbsp;OR&nbsp;&nbsp;
                  <FormButton tabIndex={-1} onClick={this.onSuggestPassword}>
                    Generate
                  </FormButton>
                </StyledConnectionFormEntry>
                <StyledConnectionFormEntry>
                  <StyledConnectionLabel>
                    Repeat new password
                  </StyledConnectionLabel>
                  <RevealablePasswordInput
                    {...getInputPropsForIndex(indexStart + 1, {
                      'data-testid': 'newPasswordConfirmation',
                      type: 'password',
                      onChange: this.onNewPasswordChange2,
                      value: this.state.newPassword2,
                      setRef: (ref: any) => setRefForIndex(indexStart + 1, ref),
                      disabled: isLoading,
                      isRevealed: this.state.revealNewPassword,
                      toggleReveal: this.togglePasswordRevealed,
                      autoComplete: 'new-password'
                    })}
                  />
                </StyledConnectionFormEntry>
                {isLoading ? (
                  'Please wait...'
                ) : (
                  <FormButton
                    data-testid="changePassword"
                    label="Change password"
                    disabled={isLoading}
                    {...getSubmitProps()}
                  />
                )}
              </>
            )
          }}
        />
      </StyledChangePasswordForm>
    )
  }
}
