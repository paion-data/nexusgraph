// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { StyledHistoryRow } from './styled'

const HistoryRow = ({ entry, handleEntryClick }: any) => {
  return (
    <StyledHistoryRow onClick={() => handleEntryClick(entry)}>
      {entry}
    </StyledHistoryRow>
  )
}
export default HistoryRow
