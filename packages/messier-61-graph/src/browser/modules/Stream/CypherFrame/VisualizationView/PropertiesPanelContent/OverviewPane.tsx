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

import {
  numberToUSLocale,
  ShowMoreOrAll,
  WarningMessage
} from 'neo4j-arc/common'
import { OverviewPaneProps } from 'neo4j-arc/graph-visualization'

import { StyleableNodeLabel } from './StyleableNodeLabel'
import { StyleableRelType } from './StyleableRelType'
import {
  PaneBody,
  PaneBodySectionHeaderWrapper,
  PaneBodySectionSmallText,
  PaneBodySectionTitle,
  PaneHeader,
  PaneWrapper,
  StyledLegendInlineList
} from './styled'

type PaneBodySectionHeaderProps = {
  title: string
  numOfElementsVisible: number
  totalNumOfElements: number
}
function PaneBodySectionHeader({
  title,
  numOfElementsVisible,
  totalNumOfElements
}: PaneBodySectionHeaderProps) {
  return (
    <PaneBodySectionHeaderWrapper>
      <PaneBodySectionTitle>{title}</PaneBodySectionTitle>
      {numOfElementsVisible < totalNumOfElements && (
        <PaneBodySectionSmallText>
          {`(showing ${numOfElementsVisible} of ${totalNumOfElements})`}
        </PaneBodySectionSmallText>
      )}
    </PaneBodySectionHeaderWrapper>
  )
}

export const OVERVIEW_STEP_SIZE = 50

export default function OverviewPane({
  graphStyle,
  hasTruncatedFields,
  nodeCount,
  relationshipCount,
  stats,
  infoMessage
}: OverviewPaneProps): JSX.Element {
  const [maxLabelsCount, setMaxLabelsCount] = useState(OVERVIEW_STEP_SIZE)
  const [maxRelationshipsCount, setMaxRelationshipsCount] =
    useState(OVERVIEW_STEP_SIZE)

  const onMoreLabelsClick = (numMore: number) => {
    setMaxLabelsCount(maxLabelsCount + numMore)
  }

  const onMoreRelationshipsClick = (numMore: number) => {
    setMaxRelationshipsCount(maxRelationshipsCount + numMore)
  }

  const { relTypes, labels } = stats
  const visibleLabelKeys = labels
    ? Object.keys(labels).slice(0, maxLabelsCount)
    : []
  const visibleRelationshipKeys = relTypes
    ? Object.keys(relTypes).slice(0, maxRelationshipsCount)
    : []
  const totalNumOfLabelTypes = labels ? Object.keys(labels).length : 0
  const totalNumOfRelTypes = relTypes ? Object.keys(relTypes).length : 0

  return (
    <PaneWrapper>
      <PaneHeader>{'Overview'}</PaneHeader>
      <PaneBody>
        {labels && visibleLabelKeys.length !== 0 && (
          <div>
            <PaneBodySectionHeader
              title={'Node labels'}
              numOfElementsVisible={visibleLabelKeys.length}
              totalNumOfElements={totalNumOfLabelTypes}
            />
            <StyledLegendInlineList>
              {visibleLabelKeys.map((label: string) => (
                <StyleableNodeLabel
                  key={label}
                  graphStyle={graphStyle}
                  allNodesCount={nodeCount}
                  selectedLabel={{
                    label,
                    propertyKeys: Object.keys(labels[label].properties),
                    count: labels[label].count
                  }}
                />
              ))}
            </StyledLegendInlineList>
            <ShowMoreOrAll
              total={totalNumOfLabelTypes}
              shown={visibleLabelKeys.length}
              moreStep={OVERVIEW_STEP_SIZE}
              onMore={onMoreLabelsClick}
            />
          </div>
        )}
        {relTypes && visibleRelationshipKeys.length !== 0 && (
          <div>
            <PaneBodySectionHeader
              title={'Relationship types'}
              numOfElementsVisible={visibleRelationshipKeys.length}
              totalNumOfElements={totalNumOfRelTypes}
            />
            <StyledLegendInlineList>
              {visibleRelationshipKeys.map(relType => (
                <StyleableRelType
                  key={relType}
                  graphStyle={graphStyle}
                  selectedRelType={{
                    relType,
                    propertyKeys: Object.keys(relTypes[relType].properties),
                    count: relTypes[relType].count
                  }}
                />
              ))}
            </StyledLegendInlineList>
            <ShowMoreOrAll
              total={totalNumOfRelTypes}
              shown={visibleRelationshipKeys.length}
              moreStep={OVERVIEW_STEP_SIZE}
              onMore={onMoreRelationshipsClick}
            />
          </div>
        )}
        <div style={{ paddingBottom: '10px' }}>
          {hasTruncatedFields && (
            <>
              <WarningMessage text={'Record fields have been truncated.'} />
              <br />
            </>
          )}
          {infoMessage && (
            <>
              <WarningMessage text={infoMessage} />
              <br />
            </>
          )}
          {nodeCount !== null &&
            relationshipCount !== null &&
            `Displaying ${numberToUSLocale(
              nodeCount
            )} nodes, ${numberToUSLocale(relationshipCount)} relationships.`}
        </div>
      </PaneBody>
    </PaneWrapper>
  )
}
