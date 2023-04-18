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
import styled from 'styled-components'

import { StyledTd } from 'browser-components/DataTables'
import {
  StyledInput as Input,
  StyledSelect as Select
} from 'browser-components/Form'

export const StyledUserTd = styled(StyledTd)`
  padding: 10px 16px 10px 0;
`
export const StyledSelect = styled(Select)``
export const StyledInput = styled(Input)``

export const StyledButtonContainer = styled.div`
  padding: 6px 0;

  &.status-indicator::before {
    background-color: #eee;
    border-radius: 5px;
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  &.status-active::before {
    background-color: ${props => props.theme.success};
  }
  &.status-suspended::before {
    background-color: ${props => props.theme.warning};
  }
`

export const StyleRolesContainer = styled.div`
  display: flex;
  flex-direction: column;

  &.roles-inline {
    flex-direction: row;
    align-items: flex-start;

    > button {
      margin-right: 5px;
    }
  }

  &:not(:first-child) {
    padding: 10px 0;
  }

  > button {
    margin: 0 0 5px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
