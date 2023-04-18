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
import React, { useCallback } from 'react'
import { Table as SemanticTable } from 'semantic-ui-react'

import { RELATABLE_ICONS, SORT_ACTIONS } from '../relatable.types'
import { useRelatableStateContext } from '../states'
import RelatableIcon from './relatable-icon'

export interface IColumnActionsProps {
  column: any

  [key: string]: any
}

export default function ColumnActions({
  column,
  ...headerProps
}: IColumnActionsProps) {
  const { onCustomSortChange } = useRelatableStateContext()
  const onSort = useCallback(() => {
    if (!onCustomSortChange) return

    const { isSortedDesc, isSorted } = column

    if (!isSorted) {
      onCustomSortChange(column, SORT_ACTIONS.SORT_DESC)
      return
    }

    if (isSortedDesc) {
      onCustomSortChange(column, SORT_ACTIONS.SORT_ASC)
      return
    }

    onCustomSortChange(column, SORT_ACTIONS.SORT_CLEAR)
  }, [onCustomSortChange])

  return (
    <SemanticTable.HeaderCell
      {...headerProps}
      colSpan={
        column.colSpan !== undefined ? column.colSpan : headerProps.colSpan
      }
      onClick={onSort}
      className="relatable__table-cell relatable__table-header-cell relatable__table-header-cell--has-actions"
    >
      <div className="relatable__column-actions-header">
        {column.render('Header')}
        {getColumnStateIcon(column)}
      </div>
    </SemanticTable.HeaderCell>
  )
}

function getColumnStateIcon(column: any) {
  const { isSortedDesc, isSorted } = column

  if (!isSorted) return null

  if (isSortedDesc) return <RelatableIcon name={RELATABLE_ICONS.SORT_DESC} />

  return <RelatableIcon name={RELATABLE_ICONS.SORT_ASC} />
}
