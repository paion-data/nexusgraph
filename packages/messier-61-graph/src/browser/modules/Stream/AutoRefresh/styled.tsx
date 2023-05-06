// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import styled from 'styled-components'

import styles from './toggleStyles.css'

export const StatusbarWrapper = styled.div`
  width: 100%;
`

export const StyledStatusBar = styled.div`
  min-height: 39px;
  line-height: 39px;
  white-space: nowrap;
  font-size: 13px;
  color: ${props => props.theme.secondaryText};
  position: relative;
  overflow: hidden;
  margin-top: 0;
  width: 100%;
  padding-left: 24px;
`

export const AutoRefreshSpan = styled.span`
  float: right;
  margin-right: 10px;
`

const ToggleLabel = styled.label`
  cursor: pointer;
`

export const AutoRefreshToggle = (props: {
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}): JSX.Element => (
  <ToggleLabel>
    AUTO-REFRESH &nbsp;
    <input
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
      className={styles['toggle-check-input']}
    />
    <span className={styles['toggle-check-text']} />
  </ToggleLabel>
)
