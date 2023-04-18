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
export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]
export const DEFAULT_AGGREGATE_OPTIONS = 'count'
export const ON_STATE_CHANGE_TRIGGERS = [
  'pageIndex',
  'pageSize',
  'sortBy',
  'filters',
  'groupBy',
  'selectedRowIds',
  'expanded'
]
export const SEMANTIC_TABLE_PROPS = [
  'attached',
  'basic',
  'className',
  'collapsing',
  'color',
  'compact',
  'definition',
  'fixed',
  'inverted',
  'padded',
  'singleLine',
  'size',
  'striped',
  'structured',
  'textAlign',
  'verticalAlign'
]

export const TOOLBAR_STATE_CLASSES = {
  isGrouped: 'rgb(245,166,35)',
  filterValue: 'rgb(253,118,110)',
  isSorted: 'rgb(109,206,157)',
  isSelected: 'rgb(104,189,244)'
}

export const ROW_STATE_CLASSES = {
  isSelected: 'rgba(104,189,244,0.10)'
}
