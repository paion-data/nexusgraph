// Copyright 2023 Paion Data. All rights reserved.
import deepmerge from "deepmerge";
import { debounce } from "lodash-es";
import React, { useEffect, useState } from "react";

import { NodeInspectorPanel, defaultPanelWidth } from "./inspection-panel/NodeInspectorPanel";
import { StyledFullSizeContainer, panelMinWidth } from "./styles/InspectorContainer.styled";
import { DetailsPaneProps } from "./inspection-panel/DefaultDetailsPane";
import { OverviewPaneProps } from "./inspection-panel/DefaultOverviewPane";
import { GraphStyleModel } from "./GraphStyle";
import { GetNodeNeighboursFn, GraphInteractionCallBack, NodesAndRels } from "./event-handler/GraphEventHandlerModel";
import { VizItem } from "./VizItem";
import { GraphStats } from "./GraphStats";
import { Graph } from "./Graph";
import { RelationshipModel } from "./models/Relationship";
import { NodeModel } from "./models/Node";
import { GraphModel } from "./models/Graph";

const DEFAULT_MAX_NEIGHBOURS = 100;

interface GraphVisualizerDefaultProps {
  maxNeighbours: number;
  updateStyle: (style: any) => void;
  isFullscreen: boolean;
  assignVisElement: (svgElement: any, graphElement: any) => void;
  getAutoCompleteCallback: (callback: (rels: RelationshipModel[], initialRun: boolean) => void) => void;
  setGraph: (graph: GraphModel) => void;
  hasTruncatedFields: boolean;
  nodePropertiesExpandedByDefault: boolean;
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void;
  wheelZoomInfoMessageEnabled?: boolean;
  initialZoomToFit?: boolean;
  disableWheelZoomInfoMessage: () => void;
  useGeneratedDefaultColors: boolean;
}

type GraphVisualizerProps = {
  relationships: RelationshipModel[];
  nodes: NodeModel[];
};

type GraphStyleVisualizerProps = GraphVisualizerDefaultProps & {
  maxNeighbours?: number;
  graphStyleData?: any;
  getNeighbours?: (
    id: string,
    currentNeighbourIds: string[] | undefined
  ) => Promise<NodesAndRels & { allNeighboursCount: number }>;
  updateStyle?: (style: any) => void;
  isFullscreen?: boolean;
  assignVisElement?: (svgElement: any, graphElement: any) => void;
  getAutoCompleteCallback?: (callback: (rels: RelationshipModel[], initialRun: boolean) => void) => void;
  setGraph?: (graph: GraphModel) => void;
  hasTruncatedFields?: boolean;
  nodeLimitHit?: boolean;
  nodePropertiesExpandedByDefault?: boolean;
  setNodePropertiesExpandedByDefault?: (expandedByDefault: boolean) => void;
  wheelZoomRequiresModKey?: boolean;
  wheelZoomInfoMessageEnabled?: boolean;
  disableWheelZoomInfoMessage?: () => void;
  DetailsPaneOverride?: React.FC<DetailsPaneProps>;
  OverviewPaneOverride?: React.FC<OverviewPaneProps>;
  onGraphInteraction?: GraphInteractionCallBack;
  useGeneratedDefaultColors?: boolean;
  autocompleteRelationships: boolean;
};

export function GraphVisualizer(props: GraphVisualizerProps, styleProps: GraphStyleVisualizerProps): JSX.Element {
  let defaultStyle: any;

  const [stats, setStats] = useState<GraphStats>({
    labels: {},
    relTypes: {},
  });
  const [graphStyle, setGraphStyle] = useState<GraphStyleModel>(
    new GraphStyleModel(styleProps.useGeneratedDefaultColors)
  );
  const [styleVersion, setStyleVersion] = useState<number>(0);
  const [nodes, setNode] = useState<NodeModel[]>(props.nodes);
  const [relationships, setRelationships] = useState<RelationshipModel[]>(props.relationships);
  const [selectedItem, setSelectedItem] = useState<VizItem>(
    styleProps.nodeLimitHit
      ? {
          type: "status-item",
          item: `Not all return nodes are being displayed due to Initial Node Display setting. Only first ${props.nodes.length} nodes are displayed.`,
        }
      : {
          type: "canvas",
          item: {
            nodeCount: props.nodes.length,
            relationshipCount: props.relationships.length,
          },
        }
  );
  const [hoveredItem, setHoveredItem] = useState<VizItem>(selectedItem);
  const [freezeLegend, setFreezeLegend] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(defaultPanelWidth());
  const [nodePropertiesExpanded, setNodePropertiesExpanded] = useState<boolean>(
    styleProps.nodePropertiesExpandedByDefault
  );

  defaultStyle = graphStyle.toSheet();

  function rebasedStyle() {
    const rebasedStyle = deepmerge(defaultStyle, styleProps.graphStyleData);
    graphStyle.loadRules(rebasedStyle);
  }

  if (styleProps.graphStyleData) {
    rebasedStyle();
  }

  setGraphStyle(freezeLegend ? new GraphStyleModel(styleProps.useGeneratedDefaultColors) : graphStyle);

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (styleProps.graphStyleData) {
      rebasedStyle();
      setGraphStyle(graphStyle);
      setStyleVersion(styleVersion + 1);
    } else {
      graphStyle.resetToDefault();
      setGraphStyle(graphStyle);
      setFreezeLegend(true);

      () => {
        setFreezeLegend(false);
        styleProps.updateStyle(graphStyle.toSheet());
      };
    }
  }, [props, stats, graphStyle, styleVersion, selectedItem, hoveredItem, freezeLegend, width, nodePropertiesExpanded]);
  const getNodeNeighbours: GetNodeNeighboursFn = (node, currentNeighbourIds, callback) => {
    if (currentNeighbourIds.length > styleProps.maxNeighbours) {
      callback({ nodes: [], relationships: [] });
    }
    // execute callback function in "GraphEventHandlerModel.getNodeNeighbours"
    if (styleProps.getNeighbours) {
      styleProps.getNeighbours(node.id, currentNeighbourIds).then(
        ({ nodes, relationships, allNeighboursCount }) => {
          if (allNeighboursCount > styleProps.maxNeighbours) {
            setSelectedItem({
              type: "status-item",
              item: `Rendering was limited to ${styleProps.maxNeighbours} of the node's total ${allNeighboursCount} neighbours due to browser config maxNeighbours.`,
            });
          }
          callback({ nodes, relationships });
        },
        () => {
          callback({ nodes: [], relationships: [] });
        }
      );
    }
  };

  function onItemMouseOver(item: VizItem): void {
    setHoveredItem(item);
  }

  let mounted = true;

  debounce((hoveredItem: VizItem) => {
    if (mounted) {
      setHoveredItem(hoveredItem);
    }
  }, 200);

  function onItemSelect(selectedItem: VizItem): void {
    setSelectedItem(selectedItem);
  }

  function onGraphModelChange(stats: GraphStats): void {
    setStats(stats);
  }

  return (
    <StyledFullSizeContainer id="svg-vis">
      <Graph
        isFullscreen={styleProps.isFullscreen}
        relationships={relationships}
        nodes={nodes}
        getNodeNeighbours={getNodeNeighbours}
        onItemMouseOver={onItemMouseOver}
        onItemSelect={onItemSelect}
        graphStyle={graphStyle}
        styleVersion={styleVersion}
        onGraphModelChange={onGraphModelChange}
        assignVisElement={styleProps.assignVisElement}
        getAutoCompleteCallback={styleProps.getAutoCompleteCallback}
        autocompleteRelationships={styleProps.autocompleteRelationships}
        setGraph={styleProps.setGraph}
        offset={(nodePropertiesExpanded ? width + 8 : 0) + 8}
        wheelZoomRequiresModKey={styleProps.wheelZoomRequiresModKey}
        wheelZoomInfoMessageEnabled={styleProps.wheelZoomInfoMessageEnabled}
        disableWheelZoomInfoMessage={styleProps.disableWheelZoomInfoMessage}
        initialZoomToFit={styleProps.initialZoomToFit}
        onGraphInteraction={styleProps.onGraphInteraction}
      />
      <NodeInspectorPanel
        graphStyle={graphStyle}
        hasTruncatedFields={styleProps.hasTruncatedFields}
        hoveredItem={hoveredItem}
        selectedItem={selectedItem}
        stats={stats}
        width={width}
        setWidth={(width: number) => setWidth(Math.max(panelMinWidth, width))}
        expanded={nodePropertiesExpanded}
        toggleExpanded={() => {
          styleProps.setNodePropertiesExpandedByDefault(!nodePropertiesExpanded);
          setNodePropertiesExpanded(!nodePropertiesExpanded);
        }}
        DetailsPaneOverride={styleProps.DetailsPaneOverride}
        OverviewPaneOverride={styleProps.OverviewPaneOverride}
      />
    </StyledFullSizeContainer>
  );
}
