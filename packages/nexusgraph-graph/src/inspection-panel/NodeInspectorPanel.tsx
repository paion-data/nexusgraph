// Copyright 2023 Paion Data. All rights reserved.
import * as React from "react";

import {
  ChevronLeftIcon as ChevronLeftIconSolid,
  ChevronRightIcon as ChevronRightIconSolid,
} from "@heroicons/react/24/solid";
import { Resizable } from "re-resizable";

import { GraphStats } from "../GraphStats";
import { GraphStyleModel } from "../GraphStyle";
import { PaneContainer, panelMinWidth, StyledNodeInspectorTopMenuChevron } from "../styles/InspectorContainer.styled";
import { VizItem } from "../VizItem";
import { NodeInspectorDrawer } from "./NodeInspectorDrawer";
import { DetailsPaneProps } from "./properties-panel-content/DetailsPane";
import { OverviewPaneProps } from "./properties-panel-content/OverviewPane";

const ChevronRightIcon = (): JSX.Element => <ChevronRightIconSolid />;

const ChevronLeftIcon = (): JSX.Element => <ChevronLeftIconSolid />;

interface NodeInspectorPanelProps {
  /**
   * Toggler flag
   */
  expanded: boolean;
  graphStyle: GraphStyleModel;
  hasTruncatedFields: boolean;
  hoveredItem: VizItem;
  selectedItem: VizItem;
  setWidth: (width: number) => void;
  stats: GraphStats;
  toggleExpanded: () => void;
  width: number;
  DetailsPaneOverride: React.FC<DetailsPaneProps>;
  OverviewPaneOverride: React.FC<OverviewPaneProps>;
}

export function defaultPanelWidth(): number {
  return Math.max(window.innerWidth / 5, panelMinWidth);
}

/**
 * The stats panel toggle-displayed on the right side of the graphing area
 *
 * The panel first determines the elements (called "shownEl" in code) that are to be shown in the panel. There are two
 * cases:
 *
 * 1. Hover: when mouse pointer is hovering over a node while the panel toggle opens; in this case, info about that
 *    particular node is displayed
 * 2. Single-click: when mouse pointer is not over a node; in this case, stats of all on-canvas nodes and relationships
 *    are calculated and displayed
 *
 * @param props  The pre-computed info and stats data about on-canvas nodes and relationships
 *
 * @returns a DOM object
 */
export function NodeInspectorPanel(props: NodeInspectorPanelProps): JSX.Element {
  const relevantItems = ["node", "relationship"];
  const hoveringNodeOrRelationship = props.hoveredItem && relevantItems.includes(props.hoveredItem.type);

  const shownEl = hoveringNodeOrRelationship ? props.hoveredItem : props.selectedItem;

  const DetailsPane = props.DetailsPaneOverride;

  const OverviewPane = props.OverviewPaneOverride;

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
