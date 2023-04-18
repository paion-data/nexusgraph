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

import { GraphStyleModel } from '../../models/GraphStyle'
import { NonClickableRelTypeChip } from './styled'

export type RelTypeProps = {
  graphStyle: GraphStyleModel
  selectedRelType: { relType: string; propertyKeys: string[]; count?: number }
}
export function RelType({
  selectedRelType,
  graphStyle
}: RelTypeProps): JSX.Element {
  const styleForRelType = graphStyle.forRelationship({
    type: selectedRelType.relType
  })
  return (
    <NonClickableRelTypeChip
      style={{
        backgroundColor: styleForRelType.get('color'),
        color: styleForRelType.get('text-color-internal')
      }}
    >
      {selectedRelType.count !== undefined
        ? `${selectedRelType.relType} (${selectedRelType.count})`
        : `${selectedRelType.relType}`}
    </NonClickableRelTypeChip>
  )
}
