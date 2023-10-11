// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from "react";

import { NodeInspectorPanel, defaultPanelWidth } from "./inspection-panel/NodeInspectorPanel";
import { StyledFullSizeContainer, panelMinWidth } from "./styles/InspectorContainer.styled";
import { DetailsPaneProps } from "./inspection-panel/DefaultDetailsPane";
import { OverviewPaneProps } from "./inspection-panel/DefaultOverviewPane";
import { GraphStyleModel } from "./GraphStyle";
import { GetNodeNeighboursFn, NodesAndRels } from "./event-handler/GraphEventHandlerModel";
import { VizItem } from "./VizItem";
import { GraphStats } from "./GraphStats";
import { BasicNode, BasicRelationship, Graph } from "./Graph";
import { RelationshipModel } from "./models/Relationship";
import { GraphModel } from "./models/Graph";
import { DetailsPane } from "./inspection-panel/properties-panel-content/properties-panel-content/DetailsPane";
import OverviewPane from "./inspection-panel/properties-panel-content/properties-panel-content/OverviewPane";

/**
 * Both {@link GraphVisualizerProps.relationships} and {@link GraphVisualizerProps.nodes} are immutable.
 */
type GraphVisualizerProps = {
  nodes: readonly BasicNode[];
  relationships: readonly BasicRelationship[];
  DetailsPaneOverride?: React.FC<DetailsPaneProps>;
  OverviewPaneOverride?: React.FC<OverviewPaneProps>;
  assignVisElement: (svgElement: any, graphElement: any) => void;
};

/**
 * Given the provided graph data, {@link GraphVisualizer} turns the data into a graph visualization of the data.
 *
 * {@link GraphVisualizer} is NOT responsible for pre-calculating the graph data; instead it assumes the data has been
 * pre-processed and passed in via {@link GraphVisualizerProps}. {@link GraphVisualizer} guarantees that it does NOT
 * mutate the nodes and relationships passed in it
 *
 * @param props
 * @param styleProps
 * @returns
 */
export function GraphVisualizer(props: GraphVisualizerProps): JSX.Element {
  const nodeLimitHit = false;
  const [selectedItem, setSelectedItem] = useState<VizItem>(
    nodeLimitHit
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
  const [graphStyle, setGraphStyle] = useState<GraphStyleModel>(new GraphStyleModel());
  const [nodePropertiesExpanded, setNodePropertiesExpanded] = useState<boolean>(true);

  const [width, setWidth] = useState<number>(defaultPanelWidth());

  const [stats, setStats] = useState<GraphStats>({
    labels: {},
    relTypes: {},
  });

  /**
   * {@link getNodeNeighbours} 在 Neo4J Browser 是借用了 Functioal Programming 的手法，将用户点击“节点展开”的时候被调用，
   * 调用的大致逻辑是向 Neo4J 数据库发送查询语句，将获取到的数据在这个函数里处理并更新图谱。因为目前我们暂时不支持展开操作，
   * 但在将来我们需要支持我们自己的展开逻辑（但不是查询 Neo4J，而是我们的后端图谱服务），所以这个方法以一个空方法的方式保留，将来实现 -
   * https://trello.com/c/59Ypljos
   *
   * @param node
   * @param currentNeighbourIds
   * @param callback
   */
  const getNodeNeighbours: GetNodeNeighboursFn = (node, currentNeighbourIds, callback) => {
    // Intentionally left blank
  };

  return (
    <StyledFullSizeContainer id="svg-vis">
      <Graph
        nodes={props.nodes}
        relationships={props.relationships}
        isFullscreen={false}
        getNodeNeighbours={getNodeNeighbours}
        onItemMouseOver={(item: VizItem) => setHoveredItem(item)}
        onItemSelect={(selectedItem: VizItem) => setSelectedItem(selectedItem)}
        graphStyle={graphStyle}
        styleVersion={0}
        onGraphModelChange={(stats: GraphStats) => setStats(stats)}
        // 这个在后续的图谱 PNG 导出需要用到 - https://trello.com/c/GYbX0IEu
        // 导出逻辑参考 Neo4J Browser CypherFrame.tsx: exportPNG = (): void => { ... }
        assignVisElement={props.assignVisElement}
        // 这个在后续的图谱展开需要用到 - 展开出来的新节点不光和被展开的节点有联系，和图上的其它节点也可能存在一种“推算”出来的联系，
        // 这个方法将执行“推算”逻辑 - https://trello.com/c/KcsSIoK9
        // Neo4J Browser VisualizationView 的 autoCompleteRelationships 也需要通过某种方式迁移过来，并放在下面的 setGraph
        autocompleteRelationships={false}
        getAutoCompleteCallback={(callback: (rels: RelationshipModel[], initialRun: boolean) => void) => {
          // intentionally left blank
        }}
        setGraph={(graph: GraphModel) => {
          // intentionally left blank
        }}
        offset={(nodePropertiesExpanded ? width + 8 : 0) + 8}
        wheelZoomRequiresModKey={true}
        wheelZoomInfoMessageEnabled={true}
        disableWheelZoomInfoMessage={() => {
          // intentionally left blank
        }}
        initialZoomToFit={true}
      />
      <NodeInspectorPanel
        graphStyle={graphStyle}
        hasTruncatedFields={false}
        hoveredItem={hoveredItem}
        selectedItem={selectedItem}
        stats={stats}
        width={width}
        setWidth={(width: number) => setWidth(Math.max(panelMinWidth, width))}
        expanded={nodePropertiesExpanded}
        toggleExpanded={() => {
          setNodePropertiesExpanded(!nodePropertiesExpanded);
        }}
        DetailsPaneOverride={DetailsPane}
        OverviewPaneOverride={OverviewPane}
      />
    </StyledFullSizeContainer>
  );
}
