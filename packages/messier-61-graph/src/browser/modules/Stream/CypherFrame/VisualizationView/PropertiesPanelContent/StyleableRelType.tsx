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
