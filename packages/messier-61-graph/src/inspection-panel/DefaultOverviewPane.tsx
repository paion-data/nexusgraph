// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from "react";

import { WarningMessage } from "./WarningMessage";
import { ShowMoreOrAll } from "./ShowMoreOrAll";
import {
  PaneBody,
  PaneHeader,
  PaneBodySectionHeaderWrapper,
  PaneBodySectionSmallText,
  PaneBodySectionTitle,
  StyledLegendInlineList,
  PaneWrapper,
} from "../styles/DefaultPane.styled";

import { NodeLabel } from "./NodeLabel";
import { RelType } from "./RelType";
import { GraphStyleModel } from "../GraphStyle";
import { GraphStats } from "../GraphStats";

interface PaneBodySectionHeaderProps {
  title: string;
  numOfElementsVisible: number;
  totalNumOfElements: number;
}

export const numberToUSLocale = (value: null | undefined | number | string): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const n = typeof value === "number" ? value : parseInt(value, 10);
  if (isNaN(n)) {
    return n.toString();
  }

  return n.toLocaleString("en-US");
};

function PaneBodySectionHeader({ title, numOfElementsVisible, totalNumOfElements }: PaneBodySectionHeaderProps) {
  return (
    <PaneBodySectionHeaderWrapper>
      <PaneBodySectionTitle>{title}</PaneBodySectionTitle>
      {numOfElementsVisible < totalNumOfElements && (
        <PaneBodySectionSmallText>
          {`(showing ${numOfElementsVisible} of ${totalNumOfElements})`}
        </PaneBodySectionSmallText>
      )}
    </PaneBodySectionHeaderWrapper>
  );
}

export const OVERVIEW_STEP_SIZE = 50;

export interface OverviewPaneProps {
  graphStyle: GraphStyleModel;
  hasTruncatedFields: boolean;
  nodeCount: number | null;
  relationshipCount: number | null;
  stats: GraphStats;
  infoMessage: string | null;
}

function DefaultOverviewPane({
  graphStyle,
  hasTruncatedFields,
  nodeCount,
  relationshipCount,
  stats,
  infoMessage,
}: OverviewPaneProps): JSX.Element {
  const [maxLabelsCount, setMaxLabelsCount] = useState(OVERVIEW_STEP_SIZE);
  const [maxRelationshipsCount, setMaxRelationshipsCount] = useState(OVERVIEW_STEP_SIZE);

  const onMoreLabelsClick = (numMore: number) => {
    setMaxLabelsCount(maxLabelsCount + numMore);
  };

  const onMoreRelationshipsClick = (numMore: number) => {
    setMaxRelationshipsCount(maxRelationshipsCount + numMore);
  };

  const { relTypes, labels } = stats;
  const visibleLabelKeys = labels ? Object.keys(labels).slice(0, maxLabelsCount) : [];
  const visibleRelationshipKeys = relTypes ? Object.keys(relTypes).slice(0, maxRelationshipsCount) : [];
  const totalNumOfLabelTypes = labels ? Object.keys(labels).length : 0;
  const totalNumOfRelTypes = relTypes ? Object.keys(relTypes).length : 0;

  return (
    <PaneWrapper>
      <PaneHeader>{"Overview"}</PaneHeader>
      <PaneBody>
        {labels && visibleLabelKeys.length !== 0 && (
          <div>
            <PaneBodySectionHeader
              title={"Node labels"}
              numOfElementsVisible={visibleLabelKeys.length}
              totalNumOfElements={totalNumOfRelTypes}
            />
            <StyledLegendInlineList>
              {visibleLabelKeys.map((label: string) => (
                <NodeLabel
                  key={label}
                  graphStyle={graphStyle}
                  allNodesCount={nodeCount}
                  selectedLabel={{
                    label,
                    propertyKeys: Object.keys(labels[label].properties),
                    count: labels[label].count,
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
              title={"Relationship types"}
              numOfElementsVisible={visibleRelationshipKeys.length}
              totalNumOfElements={totalNumOfRelTypes}
            />
            <StyledLegendInlineList>
              {visibleRelationshipKeys.map((relType) => (
                <RelType
                  key={relType}
                  graphStyle={graphStyle}
                  selectedRelType={{
                    relType,
                    propertyKeys: Object.keys(relTypes[relType].properties),
                    count: relTypes[relType].count,
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
        <div style={{ paddingBottom: "10px" }}>
          {hasTruncatedFields && (
            <>
              <WarningMessage text={"Record fields have been truncated."} />
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
            `Displaying ${numberToUSLocale(nodeCount)} nodes, ${numberToUSLocale(relationshipCount)} relationships.`}
        </div>
      </PaneBody>
    </PaneWrapper>
  );
}

export default DefaultOverviewPane;
