// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'
import { connect } from 'react-redux'

import FrameBodyTemplate from '../../Frame/FrameBodyTemplate'
import FrameError from '../../Frame/FrameError'
import ConnectionFormController from './ConnectionFormController'
import { StyledConnectionAside } from './styled'
import { Lead } from 'browser-components/Text'
import { H3 } from 'browser-components/headers'
import { getActiveConnection } from 'shared/modules/connections/connectionsDuck'

type ChangePasswordFrameState = any

class ChangePasswordFrame extends Component<any, ChangePasswordFrameState> {
  constructor(props: any) {
    super(props)
    const connection = this.props.frame.connectionData
    this.state = {
      ...connection,
      passwordChangeNeeded: false,
      error: {},
      success: false
    }
  }

  error = (e: any) => {
    if (e.code === 'N/A') {
      e.message = 'Existing password is incorrect'
    }
    this.setState({ error: e })
  }

  onSuccess = () => {
    this.setState({ password: '' })
    this.setState({ success: true })
  }

  render() {
    const content = (
      <>
        <StyledConnectionAside>
          <H3>Password change</H3>
          {this.state.success ? (
            <Lead>Password change successful</Lead>
          ) : (
            <Lead>
              {this.props.activeConnection
                ? 'Enter your current password and the new twice to change your password.'
                : 'Please connect to a database to change the password.'}
            </Lead>
          )}
        </StyledConnectionAside>

        {this.props.activeConnection && (
          <ConnectionFormController
            {...this.props}
            error={this.error}
            onSuccess={this.onSuccess}
            forcePasswordChange
            showExistingPasswordInput
          />
        )}
      </>
    )
    return (
      <FrameBodyTemplate
        isCollapsed={this.props.isCollapsed}
        isFullscreen={this.props.isFullscreen}
        statusBar={
          <FrameError
            code={this.state.error.code}
            message={this.state.error.message}
          />
        }
        contents={content}
      />
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    activeConnection: getActiveConnection(state)
  }
}

export default connect(mapStateToProps, () => ({}))(ChangePasswordFrame)
