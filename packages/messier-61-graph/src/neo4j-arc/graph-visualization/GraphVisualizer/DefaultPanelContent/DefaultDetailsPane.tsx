// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from 'react'

import { ClipboardCopier, PropertiesTable, upperFirst } from 'neo4j-arc/common'
import { NodeItem, RelationshipItem } from '../../types'

import { PaneBody, PaneHeader, PaneTitle, PaneWrapper } from './styled'
import { NodeLabel } from './NodeLabel'
import { RelType } from './RelType'
import { GraphStyleModel } from '../../models/GraphStyle'

export const DETAILS_PANE_STEP_SIZE = 1000
export type DetailsPaneProps = {
  vizItem: NodeItem | RelationshipItem
  graphStyle: GraphStyleModel
  nodeInspectorWidth: number
}
export function DefaultDetailsPane({
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
            iconSize={10}
          />
        </PaneTitle>
        {vizItem.type === 'relationship' && (
          <RelType
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
              <NodeLabel
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
      <PaneBody>
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
