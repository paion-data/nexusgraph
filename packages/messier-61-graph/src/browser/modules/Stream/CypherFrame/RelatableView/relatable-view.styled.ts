// Copyright 2023 Paion Data. All rights reserved.
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
