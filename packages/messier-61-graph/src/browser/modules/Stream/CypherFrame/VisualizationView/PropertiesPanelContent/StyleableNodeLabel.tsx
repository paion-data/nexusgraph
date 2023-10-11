// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import { Popup } from 'semantic-ui-react'

import { StyledLabelChip } from 'neo4j-arc/common'
import { GraphStyleModel } from 'neo4j-arc/graph-visualization'

import { GrassEditor } from './GrassEditor'

export type StyleableNodeLabelProps = {
  selectedLabel: {
    label: string
    propertyKeys: string[]
    count?: number
  }
  graphStyle: GraphStyleModel
  /* The total number of nodes in returned graph */
  allNodesCount?: number | null
}
export function StyleableNodeLabel({
  graphStyle,
  selectedLabel,
  allNodesCount
}: StyleableNodeLabelProps): JSX.Element {
  const labels = selectedLabel.label === '*' ? [] : [selectedLabel.label]
  const graphStyleForLabel = graphStyle.forNode({
    labels: labels
  })
  const count =
    selectedLabel.label === '*' ? allNodesCount : selectedLabel.count

  return (
    <Popup
      on="click"
      basic
      key={selectedLabel.label}
      wide
      position="left center"
      offset={[0, 0]}
      trigger={
        <StyledLabelChip
          style={{
            backgroundColor: graphStyleForLabel.get('color'),
            color: graphStyleForLabel.get('text-color-internal')
          }}
          data-testid={`property-details-overview-node-label-${selectedLabel.label}`}
        >
          {`${selectedLabel.label}${count || count === 0 ? ` (${count})` : ''}`}
        </StyledLabelChip>
      }
    >
      <GrassEditor selectedLabel={selectedLabel} />
    </Popup>
  )
}
