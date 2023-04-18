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
import { map } from 'lodash-es'
import React, { useCallback } from 'react'
import { Table as SemanticTable } from 'semantic-ui-react'

import { useRelatableStateContext } from '../states'
import arrayHasItems from '../utils/array-has-items'
import { columnHasActions } from '../utils/column-actions'
import getRowNumber from '../utils/get-row-number'
import getSemanticTableProps from '../utils/get-semantic-table-props'
import isLastIndex from '../utils/is-last-index'
import ColumnActions from './column-actions'
import { BodyRow } from './renderers'
import RowActions from './renderers/row-actions'

export interface ITableProps {
  // used for rendering loading animation and empty rows
  loading?: boolean
  expectedRowCount?: number
  headless?: boolean

  // semantic ui react props https://react.semantic-ui.com/collections/table/
  attached?: boolean | string
  basic?: boolean | string
  className?: string
  collapsing?: boolean
  color?: string
  compact?: boolean | string
  definition?: boolean
  fixed?: boolean
  inverted?: boolean
  padded?: boolean | string
  singleLine?: boolean
  size?: string
  striped?: boolean
  structured?: boolean
  textAlign?: string
  verticalAlign?: string
}

export default function Table({
  loading,
  expectedRowCount,
  headless,
  ...rest
}: ITableProps): JSX.Element {
  const {
    getTableProps,
    headerGroups,
    state: { pageIndex = 0, pageSize = 1 },
    _rowsToUse: rows, // @todo: handle this more gracefully inside addOns
    prepareRow,
    availableTableActions,
    onCustomSelectionChange
  } = useRelatableStateContext()
  const { className = '', ...semanticTableProps } = getSemanticTableProps(rest)
  const onSelectAllClick = useCallback(
    (select: boolean) => {
      onCustomSelectionChange!(rows, select)
    },
    [onCustomSelectionChange, rows]
  )

  return (
    <SemanticTable
      {...getTableProps()}
      {...semanticTableProps}
      className={`relatable__table ${className}`}
    >
      {!headless && (
        <SemanticTable.Header>
          {map(headerGroups, (headerGroup, index: number) => (
            <SemanticTable.Row
              {...headerGroup.getHeaderGroupProps()}
              className="relatable__table-row relatable__table-header-row"
            >
              <SemanticTable.HeaderCell
                className="relatable__table-cell relatable__table-header-cell relatable__table-header-actions-cell"
                collapsing
              >
                {isLastIndex(headerGroups, index) && (
                  <RowActions
                    rows={rows}
                    onSelectClick={onCustomSelectionChange && onSelectAllClick}
                  />
                )}
              </SemanticTable.HeaderCell>
              {map(headerGroup.headers, (column: any) => {
                const headerProps = column.getHeaderProps()
                const hasActions =
                  isLastIndex(headerGroups, index) &&
                  columnHasActions(column, availableTableActions)

                if (column.colSpan === 0) return null

                return hasActions ? (
                  <ColumnActions column={column} {...headerProps} />
                ) : (
                  <SemanticTable.HeaderCell
                    {...headerProps}
                    colSpan={
                      column.colSpan !== undefined
                        ? column.colSpan
                        : headerProps.colSpan
                    }
                    className="relatable__table-cell relatable__table-header-cell"
                  >
                    {column.render('Header')}
                  </SemanticTable.HeaderCell>
                )
              })}
            </SemanticTable.Row>
          ))}
        </SemanticTable.Header>
      )}
      <SemanticTable.Body>
        {map(rows, (row, index: number) => {
          prepareRow(row)

          return (
            <BodyRow
              row={row}
              rowNumber={getRowNumber(index, pageIndex, pageSize)}
              loading={loading}
              {...row.getRowProps()}
            />
          )
        })}
        {/* render empty rows when passed expectedRowCount and no data */}
        {!arrayHasItems(rows) && loading && expectedRowCount
          ? map(Array(expectedRowCount), (_, index) => (
              <SemanticTable.Row
                key={`empty-row-${index}`}
                className="relatable__table-row relatable__table-body-row"
              >
                <SemanticTable.Cell
                  className="relatable__table-cell relatable__table-body-cell"
                  colSpan="100%"
                >
                  <div className="relatable__table-body-cell-loader" />
                </SemanticTable.Cell>
              </SemanticTable.Row>
            ))
          : null}
      </SemanticTable.Body>
    </SemanticTable>
  )
}
