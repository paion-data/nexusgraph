// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from "react";
import {
  ChevronRightIcon as ChevronRightIconSolid,
  ChevronLeftIcon as ChevronLeftIconSolid,
} from "@heroicons/react/24/solid";
import { GraphStyleModel } from "../GraphStyle";
import { VizItem } from "../VizItem";
import { GraphStats } from "../GraphStats";
import { PaneContainer, StyledNodeInspectorTopMenuChevron, panelMinWidth } from "../styles/InspectorContainer.styled";
import { DefaultDetailsPane, DetailsPaneProps } from "./DefaultDetailsPane";
import DefaultOverviewPane, { OverviewPaneProps } from "./DefaultOverviewPane";
import { NodeInspectorDrawer } from "./NodeInspectorDrawer";
import { Resizable } from "re-resizable";

const ChevronRightIcon = (): JSX.Element => <ChevronRightIconSolid />;

const ChevronLeftIcon = (): JSX.Element => <ChevronLeftIconSolid />;

interface NodeInspectorPanelProps {
  expanded: boolean;
  graphStyle: GraphStyleModel;
  hasTruncatedFields: boolean;
  hoveredItem: VizItem;
  selectedItem: VizItem;
  setWidth: (width: number) => void;
  stats: GraphStats;
  toggleExpanded: () => void;
  width: number;
  DetailsPaneOverride?: React.FC<DetailsPaneProps>;
  OverviewPaneOverride?: React.FC<OverviewPaneProps>;
}

export function defaultPanelWidth(): number {
  return Math.max(window.innerWidth / 5, panelMinWidth);
}

export function NodeInspectorPanel(props: NodeInspectorPanelProps): JSX.Element {
  const relevantItems = ["node", "relationship"];
  const hoveringNodeOrRelationship = props.hoveredItem && relevantItems.includes(props.hoveredItem.type);

  const shownEl = hoveringNodeOrRelationship ? props.hoveredItem : props.selectedItem;

  const DetailsPane = props.DetailsPaneOverride === undefined ? DefaultDetailsPane : props.DetailsPaneOverride;

  const OverviewPane = props.OverviewPaneOverride === undefined ? DefaultOverviewPane : props.OverviewPaneOverride;

  return (
    <>
      <StyledNodeInspectorTopMenuChevron
        aria-label={props.expanded ? "Collapse the node properties display" : "Expand the node properties display"}
        expanded={props.expanded}
        onClick={props.toggleExpanded}
        title={props.expanded ? "Collapse the node properties display" : "Expand the node properties display"}
      >
        {props.expanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </StyledNodeInspectorTopMenuChevron>

      <NodeInspectorDrawer width={props.width} isOpen={props.expanded}>
        <Resizable
          size={{
            width: props.width,
            height: "100%",
          }}
          onResize={(_e: any, _direction: any, ref: { style: { width: string } }, _d: any) => {
            const width = Number.parseInt(ref.style.width.slice(0, -2));
            props.setWidth(width);
          }}
          data-testid="vizInspector"
        >
          <PaneContainer paneWidth={props.width}>
            {shownEl.type === "node" || shownEl.type === "relationship" ? (
              <DetailsPane vizItem={shownEl} graphStyle={props.graphStyle} nodeInspectorWidth={props.width} />
            ) : (
              <OverviewPane
                graphStyle={props.graphStyle}
                hasTruncatedFields={props.hasTruncatedFields}
                stats={props.stats}
                nodeCount={shownEl.type === "canvas" ? shownEl.item.nodeCount : null}
                relationshipCount={shownEl.type === "canvas" ? shownEl.item.relationshipCount : null}
                infoMessage={shownEl.type === "status-item" ? shownEl.item : null}
              />
            )}
          </PaneContainer>
        </Resizable>
      </NodeInspectorDrawer>
    </>
  );
}
