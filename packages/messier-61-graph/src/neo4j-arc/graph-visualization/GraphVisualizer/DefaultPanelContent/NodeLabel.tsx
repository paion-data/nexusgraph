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

import { NonClickableLabelChip } from './styled'

import { GraphStyleModel } from '../../models/GraphStyle'

export type NodeLabelProps = {
  selectedLabel: {
    label: string
    propertyKeys: string[]
    count?: number
  }
  graphStyle: GraphStyleModel
  /* The total number of nodes in returned graph */
  allNodesCount?: number | null
}
export function NodeLabel({
  graphStyle,
  selectedLabel,
  allNodesCount
}: NodeLabelProps): JSX.Element {
  const labels = selectedLabel.label === '*' ? [] : [selectedLabel.label]
  const graphStyleForLabel = graphStyle.forNode({
    labels: labels
  })
  const count =
    selectedLabel.label === '*' ? allNodesCount : selectedLabel.count

  return (
    <NonClickableLabelChip
      style={{
        backgroundColor: graphStyleForLabel.get('color'),
        color: graphStyleForLabel.get('text-color-internal')
      }}
    >
      {`${selectedLabel.label}${count || count === 0 ? ` (${count})` : ''}`}
    </NonClickableLabelChip>
  )
}
