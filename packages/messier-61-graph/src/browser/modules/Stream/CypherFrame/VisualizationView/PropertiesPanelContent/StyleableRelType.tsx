// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import { Popup } from 'semantic-ui-react'

import { StyledRelationshipChip } from 'neo4j-arc/common'
import { GraphStyleModel } from 'neo4j-arc/graph-visualization'

import { GrassEditor } from './GrassEditor'

export type StyleableRelTypeProps = {
  graphStyle: GraphStyleModel
  selectedRelType: { relType: string; propertyKeys: string[]; count?: number }
}
export function StyleableRelType({
  selectedRelType,
  graphStyle
}: StyleableRelTypeProps): JSX.Element {
  const styleForRelType = graphStyle.forRelationship({
    type: selectedRelType.relType
  })
  return (
    <Popup
      on="click"
      basic
      key={selectedRelType.relType}
      position="left center"
      offset={[0, 0]}
      trigger={
        <StyledRelationshipChip
          style={{
            backgroundColor: styleForRelType.get('color'),
            color: styleForRelType.get('text-color-internal')
          }}
          data-testid={`property-details-overview-relationship-type-${selectedRelType.relType}`}
        >
          {selectedRelType.count !== undefined
            ? `${selectedRelType.relType} (${selectedRelType.count})`
            : `${selectedRelType.relType}`}
        </StyledRelationshipChip>
      }
      wide
    >
      <GrassEditor selectedRelType={selectedRelType} />
    </Popup>
  )
}
