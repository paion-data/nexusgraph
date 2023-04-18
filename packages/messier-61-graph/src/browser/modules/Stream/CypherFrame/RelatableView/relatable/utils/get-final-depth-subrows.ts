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
import { flatMap } from 'lodash-es'

import arrayHasItems from './array-has-items'

export default function getFinalDepthSubRows(row: any): any[] {
  const { subRows = [] } = row

  if (arrayHasItems(subRows)) {
    return flatMap(subRows, getFinalDepthSubRows)
  }

  return [row.values]
}
