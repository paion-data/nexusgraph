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
import React, { useState } from 'react'

import { ClipboardCopier, PropertiesTable, upperFirst } from 'neo4j-arc/common'

import { StyleableNodeLabel } from './StyleableNodeLabel'
import { StyleableRelType } from './StyleableRelType'
import { PaneBody, PaneHeader, PaneTitle, PaneWrapper } from './styled'
import { DetailsPaneProps } from 'neo4j-arc'

export const DETAILS_PANE_STEP_SIZE = 1000
export function DetailsPane({
  vizItem,
  graphStyle,
  nodeInspectorWidth
}: DetailsPaneProps): JSX.Element {
  const [maxPropertiesCount, setMaxPropertiesCount] = useState(
    DETAILS_PANE_STEP_SIZE
  )

  const idProperty = {
    key: '<id>',
    value: `${vizItem.item.id}`,
    type: 'String'
  }
  const allItemProperties = [idProperty, ...vizItem.item.propertyList].sort(
    (a, b) => (a.key < b.key ? -1 : 1)
  )
  const visibleItemProperties = allItemProperties.slice(0, maxPropertiesCount)

  const handleMorePropertiesClick = (numMore: number) => {
    setMaxPropertiesCount(maxPropertiesCount + numMore)
  }

  return (
    <PaneWrapper>
      <PaneHeader>
        <PaneTitle>
          <span>{`${upperFirst(vizItem.type)} properties`}</span>
          <ClipboardCopier
            textToCopy={allItemProperties
              .map(prop => `${prop.key}: ${prop.value}`)
              .join('\n')}
            titleText="Copy all properties to clipboard"
            iconSize={12}
          />
        </PaneTitle>
        {vizItem.type === 'relationship' && (
          <StyleableRelType
            selectedRelType={{
              propertyKeys: vizItem.item.propertyList.map(p => p.key),
              relType: vizItem.item.type
            }}
            graphStyle={graphStyle}
          />
        )}
        {vizItem.type === 'node' &&
          vizItem.item.labels.map((label: string) => {
            return (
              <StyleableNodeLabel
                key={label}
                graphStyle={graphStyle}
                selectedLabel={{
                  label,
                  propertyKeys: vizItem.item.propertyList.map(p => p.key)
                }}
              />
            )
          })}
      </PaneHeader>
      <PaneBody data-testid="viz-details-pane-body">
        <PropertiesTable
          visibleProperties={visibleItemProperties}
          onMoreClick={handleMorePropertiesClick}
          moreStep={DETAILS_PANE_STEP_SIZE}
          totalNumItems={allItemProperties.length}
          nodeInspectorWidth={nodeInspectorWidth}
        />
      </PaneBody>
    </PaneWrapper>
  )
}
