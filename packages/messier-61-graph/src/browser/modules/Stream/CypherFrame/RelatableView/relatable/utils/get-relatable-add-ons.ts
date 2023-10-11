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
import {
  withExpanded,
  withFilters,
  withGrouping,
  withPagination,
  withSelection,
  withSorting
} from '../add-ons'
import { IRelatableProps } from '../components/relatable/relatable'
import { TableAddOnReturn } from '../relatable.types'

/**
 * Adds enhancers based on boolean props
 * @param     {Object}                                  props
 * @param     {boolean | IWithFiltersOptions}           props.filterable
 * @param     {boolean | IWithGroupingOptions}          props.groupable
 * @param     {boolean | IWithSortingOptions}           props.sortable
 * @param     {boolean | IWithPaginationOptions}        props.paginated
 * @param     {boolean | IWithSelectionOptions}         props.selectable
 * @return    {TableAddOnReturn[]}
 */
export default function getRelatableAddOns({
  groupable,
  filterable,
  sortable,
  paginated,
  expandable,
  selectable
}: IRelatableProps): TableAddOnReturn[] {
  const addOns: TableAddOnReturn[] = []

  if (filterable) {
    addOns.push(withFilters(filterable !== true ? filterable : {}))
  }

  if (groupable) {
    addOns.push(withGrouping(groupable !== true ? groupable : {}))
  }

  if (sortable) {
    addOns.push(withSorting(sortable !== true ? sortable : {}))
  }

  if (expandable) {
    addOns.push(withExpanded(expandable !== true ? expandable : {}))
  }

  if (paginated) {
    addOns.push(withPagination(paginated !== true ? paginated : {}))
  }

  if (selectable) {
    addOns.push(withSelection(selectable !== true ? selectable : {}))
  }

  return addOns
}
