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
import React from 'react'
import { Menu, MenuProps } from 'semantic-ui-react'

import {
  withFilters,
  withGrouping,
  withSelection,
  withSorting
} from '../../add-ons'
import { useRelatableStateContext } from '../../states'
import { isActionAvailable } from '../../utils/relatable-actions'
import FilterableToolbar from './filterable.toolbar'
import GroupableToolbar from './groupable.toolbar'
import SelectableToolbar from './selectable.toolbar'
import SortableToolbar from './sortable.toolbar'

export default function Toolbar(
  props: React.PropsWithChildren<MenuProps> = {}
): JSX.Element {
  const { className = '', children, ...rest } = props
  const { availableGlobalActions } = useRelatableStateContext()

  if (children) {
    return (
      <Menu
        icon
        secondary
        {...rest}
        className={`relatable__toolbar ${className}`}
      >
        {children}
      </Menu>
    )
  }

  return (
    <Menu
      icon
      secondary
      {...rest}
      className={`relatable__toolbar ${className}`}
    >
      {isActionAvailable(availableGlobalActions, withGrouping.name) && (
        <GroupableToolbar />
      )}
      {isActionAvailable(availableGlobalActions, withFilters.name) && (
        <FilterableToolbar />
      )}
      {isActionAvailable(availableGlobalActions, withSorting.name) && (
        <SortableToolbar />
      )}
      {isActionAvailable(availableGlobalActions, withSelection.name) && (
        <SelectableToolbar />
      )}
    </Menu>
  )
}
