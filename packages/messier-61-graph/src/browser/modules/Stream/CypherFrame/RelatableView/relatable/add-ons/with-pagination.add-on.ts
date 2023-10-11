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
import { pick, values } from 'lodash-es'
import { useMemo } from 'react'
import {
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  usePagination
} from 'react-table'

import { DEFAULT_PAGE_SIZE_OPTIONS } from '../constants'
import {
  IRelatableStateInstance,
  PageSetter,
  PageSizeSetter,
  TableAddOnReturn
} from '../relatable.types'

export interface IWithPaginationOptions<Data extends object = any>
  extends UsePaginationOptions<Data> {
  onPageChange?: PageSetter
  onPageSizeChange?: PageSizeSetter
  pageSizeOptions?: number[]

  // react-table state overrides https://react-table.js.org/api/usePagination
  pageSize?: number
  pageIndex?: number
}

export type IWithPaginationState<Data extends object = any> =
  UsePaginationState<Data>

export interface IWithPaginationInstance<Data extends object = any>
  extends UsePaginationInstanceProps<Data>,
    IRelatableStateInstance<Data, IWithPaginationState<Data>> {
  customPageSizeOptions: number[]
  onCustomPageSizeChange?: PageSizeSetter
  onCustomPageChange?: PageSetter
}

export default function withPagination<Data extends object = any>(
  options: IWithPaginationOptions<Data> = {}
): TableAddOnReturn {
  const {
    pageSize,
    pageIndex,
    onPageSizeChange,
    onPageChange,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    ...tableParams
  } = options
  const stateParams = pick(options, ['pageSize', 'pageIndex'])

  return [
    withPagination.name,
    null,
    () => false,
    () =>
      useMemo(
        (): Partial<IWithPaginationInstance> => ({
          ...tableParams,
          customPageSizeOptions: pageSizeOptions,
          // @todo: figure out strategy for these
          onCustomPageSizeChange: onPageSizeChange,
          onCustomPageChange: onPageChange
        }),
        [onPageSizeChange, onPageChange, ...values(tableParams)]
      ),
    () => useMemo(() => stateParams, values(stateParams)),
    usePagination
  ]
}
