// Copyright 2023 Paion Data. All rights reserved.
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
