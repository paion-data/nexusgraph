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
