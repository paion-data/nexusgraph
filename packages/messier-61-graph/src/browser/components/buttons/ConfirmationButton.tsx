// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'
import styled from 'styled-components'

import { CancelIcon, MinusIcon, RightArrowIcon } from '../icons/LegacyIcons'

const IconButton = styled.button`
  margin-left: 4px;
  border: 0;
  background: transparent;
  &:focus {
    outline: none;
  }
`

type State = any

interface ConfirmationButtonProps {
  onConfirmed: () => void
  confirmIcon?: JSX.Element
  cancelIcon?: JSX.Element
  requestIcon?: JSX.Element
}

export class ConfirmationButton extends Component<
  ConfirmationButtonProps,
  State
> {
  cancelIcon: any
  confirmIcon: any
  requestIcon: any
  constructor(props: ConfirmationButtonProps) {
    super(props)

    this.state = {
      requested: false
    }

    this.confirmIcon = this.props.confirmIcon || <RightArrowIcon />
    this.cancelIcon = this.props.cancelIcon || <CancelIcon />
    this.requestIcon = this.props.requestIcon || <MinusIcon />
  }

  render() {
    if (this.state.requested) {
      return (
        <span>
          <IconButton
            data-testid="confirmation-button-confirm"
            onClick={() => {
              this.setState({ requested: false })
              this.props.onConfirmed()
            }}
          >
            {this.confirmIcon}
          </IconButton>
          <IconButton
            data-testid="confirmation-button-cancel"
            onClick={() => this.setState({ requested: false })}
          >
            {this.cancelIcon}
          </IconButton>
        </span>
      )
    } else {
      return (
        <IconButton
          data-testid="confirmation-button-initial"
          onClick={() => this.setState({ requested: true })}
        >
          {this.requestIcon}
        </IconButton>
      )
    }
  }
}
