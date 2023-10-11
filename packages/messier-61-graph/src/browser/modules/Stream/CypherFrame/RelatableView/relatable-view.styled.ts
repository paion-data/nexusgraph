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

export const RelatableStyleWrapper = styled.div`
  width: 100%;
  /* semantic ui specificity... */
  .relatable__table-row,
  .relatable__table-row.relatable__table-header-row
    .relatable__table-header-cell {
    background-color: ${props => props.theme.frameBackground};
    color: ${props => props.theme.secondaryText};
  }
  .relatable__table-row-number {
    color: ${props => props.theme.preText};
    background-color: ${props => props.theme.preBackground};
  }
  .relatable__table-header-row .relatable__table-cell {
    border-bottom: ${props => props.theme.inFrameBorder};
  }
  .relatable__table-body-row .relatable__table-cell {
    border-top: ${props => props.theme.inFrameBorder};
    vertical-align: top;
  }
`

export const StyledJsonPre = styled.pre`
  background-color: ${props => props.theme.preBackground};
  border-radius: 5px;
  margin: 0px 10px;
  border-bottom: none;
  color: ${props => props.theme.preText};
  line-height: 26px;
  padding: 2px 10px;
  max-width: 100%;
  white-space: pre-wrap;
  position: relative;
`

export const StyledPreSpan = styled.span`
  white-space: pre;
`
export const CopyIconAbsolutePositioner = styled.span`
  position: absolute;
  right: 10px;
  top: 4px;
`
