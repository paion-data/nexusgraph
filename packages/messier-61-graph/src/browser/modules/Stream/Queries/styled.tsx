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

export const Code = styled.code`
  white-space: nowrap;
  overflow: hidden;
  color: #fd766e;
  background-color: ${props => props.theme.frameSidebarBackground};
  border-radius: 2px;
  padding: 4px;

  a {
    color: #c7254e !important;
  }
`
export const StyledTableWrapper = styled.div`
  margin: 20px 10px;
`
export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`
export const StyledTh = styled.th<{ width?: string }>`
  text-align: left;
  height: 30px;
  vertical-align: top;
  padding: 5px;
  width: ${props => props.width || 'auto'};
`
export const StyledTd = styled.td<{ width?: string }>`
  padding: 5px;
  width: ${props => props.width || 'auto'};
  text-overflow: ellipsis;
  overflow: hidden;
`
export const StyledHeaderRow = styled.tr`
  border-top: ${props => props.theme.inFrameBorder};
  border-bottom: ${props => props.theme.inFrameBorder};
`
