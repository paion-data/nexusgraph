// Copyright 2023 Paion Data. All rights reserved.
import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 0;
`
export const StyledBodyTr = styled.tr`
  background-color: ${props => props.theme.secondaryBackground};
  color: ${props => props.theme.secondaryText};
`
export const StyledTh = styled.th`
  text-align: left;
  height: 39px;
  font-weight: bold;
  padding: 10px 16px 10px 0;
  line-height: 39px;
  border-bottom: ${props => props.theme.inFrameBorder};
`
export const StyledTd = styled.td`
  border-bottom: ${props => props.theme.inFrameBorder};
  vertical-align: top;
  line-height: 26px;
  padding: 10px 16px 10px 0;
`
