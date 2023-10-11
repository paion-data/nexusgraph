// Copyright 2023 Paion Data. All rights reserved.
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
