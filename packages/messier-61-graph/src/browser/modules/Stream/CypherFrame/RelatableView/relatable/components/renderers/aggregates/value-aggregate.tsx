// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { ICellProps } from '../index'

export default function ValueAggregate({ cell: { value } }: ICellProps) {
  return <span className="relatable__table-aggregate-cell">{value} Values</span>
}
