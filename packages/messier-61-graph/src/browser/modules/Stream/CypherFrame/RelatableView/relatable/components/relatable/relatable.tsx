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
import React, { PropsWithChildren } from 'react'
import { Column } from 'react-table'

import {
  IWithExpandedOptions,
  IWithFiltersOptions,
  IWithGroupingOptions,
  IWithPaginationOptions,
  IWithSelectionOptions,
  IWithSortingOptions
} from '../../add-ons'
import { CellCollSpanGetter, StateChangeHandler } from '../../relatable.types'
import { RelatableActionContext, RelatableStateContext } from '../../states'
import Pagination from '../pagination'
import Table, { ITableProps } from '../table'
import { useRelatableActions, useRelatableState } from './relatable.hooks'
import { StyleWrapper } from './relatable.styled'

export interface IRelatableProps<Data extends object = any> {
  // see https://react-table.js.org/api/usetable
  columns: Column<Data>[]
  data: Data[]
  defaultColumn?: Partial<Column<Data>>

  // Relatable state change handler
  onStateChange?: StateChangeHandler

  // cell col span getter
  getCellColSpan?: CellCollSpanGetter

  // add on options
  filterable?: boolean | IWithFiltersOptions
  groupable?: boolean | IWithGroupingOptions
  sortable?: boolean | IWithSortingOptions
  expandable?: boolean | IWithExpandedOptions
  paginated?: boolean | IWithPaginationOptions
  selectable?: boolean | IWithSelectionOptions
}

// when used without children, Table props are passed along as well
export interface IRelatableBasicProps extends IRelatableProps, ITableProps {}

export type IRelatableChildrenProps = PropsWithChildren<IRelatableProps>

export default function Relatable(props: IRelatableBasicProps): JSX.Element {
  const { columns, data, defaultColumn, paginated, ...rest } = props

  return (
    <RelatableState {...props}>
      <Table {...rest} />
      {paginated && <Pagination />}
    </RelatableState>
  )
}

function RelatableState({
  children,
  ...rest
}: IRelatableChildrenProps): JSX.Element {
  const tableProps = useRelatableState(rest)

  return (
    <RelatableStateContext.Provider value={tableProps}>
      <RelatableActions>
        <StyleWrapper className="relatable">{children}</StyleWrapper>
      </RelatableActions>
    </RelatableStateContext.Provider>
  )
}

function RelatableActions({ children }: any) {
  const actionsState = useRelatableActions()

  return (
    <RelatableActionContext.Provider value={actionsState}>
      {children}
    </RelatableActionContext.Provider>
  )
}
