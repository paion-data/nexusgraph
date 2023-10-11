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
import { entries, kebabCase, keys, map, reduce } from 'lodash-es'

import { ROW_STATE_CLASSES, TOOLBAR_STATE_CLASSES } from '../constants'

export function getRowClasses(row: any) {
  return `relatable__table-row relatable__table-body-row ${getRowStateClasses(
    row
  )}`
}

export function createRowStateClasses() {
  return map(entries(ROW_STATE_CLASSES), ([state, bgColor]) =>
    bgColor
      ? `.${getRowStateClass(state)} {
        background-color: ${bgColor};
      }`
      : ''
  )
}

export function createToolbarStateClasses() {
  return map(
    entries(TOOLBAR_STATE_CLASSES),
    ([state, bgColor]) => `
    /* need to win over semantic specificity */
    .menu .label.${getToolbarStateClass(state)} {
      background-color: ${bgColor};
    }
  `
  )
}

export function getToolbarStateClass(state: string) {
  return `relatable__toolbar-label--${kebabCase(state)}`
}

function getRowStateClasses(row: any) {
  return reduce(
    keys(ROW_STATE_CLASSES),
    (agg, state) => (row[state] ? `${agg} ${getRowStateClass(state)}` : agg),
    ''
  )
}

function getRowStateClass(state: string) {
  return `relatable__table-row-state--${kebabCase(state)}`
}
