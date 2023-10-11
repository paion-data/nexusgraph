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
// default renderers
export { default as BodyRow } from './body-row'
export { default as BodyCell } from './body-cell'
export { default as Filter } from './filter'
export { default as ExpandedRow } from './expanded-row'

// cell values
export { default as JSONCell } from './cells/json-cell'
export { default as DateCell } from './cells/date-cell'
export { default as NumberCell } from './cells/number-cell'
export { default as TextCell } from './cells/text-cell'

// filters
export { default as TextFilter } from './filters/text-filter'

// aggregates
export { default as ValueAggregate } from './aggregates/value-aggregate'

export interface ICellProps {
  cell: any
  [key: string]: any
}

export interface IRowProps {
  row: any
  rowNumber: number
  loading?: boolean
}

export interface IFilterFieldProps {
  column: any
  onChange: (val: any) => void
}
