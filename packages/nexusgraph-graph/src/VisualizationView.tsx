// Copyright 2023 Paion Data. All rights reserved.
import { GraphVisualizer } from "./GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";
import { BasicNode, BasicRelationship } from "./basicTypes";
import { ALL_NODE_LABELS_SETS, ALL_REL_TYPE_SETS } from "./GraphStats";

import { useSelector } from "react-redux";
import { GlobalState } from "../../nexusgraph-provider";

export interface VisualizationProps {
  assignVisElement: (svgElement: any, graphElement: any) => void;
}

/**
 * {@link Visualization} is responsible for computing and passing the graph data to the components that draws the gaph,
 * i.e. {@link GraphVisualizer}
 *
 * @returns a DOM object
 */
export function Visualization(props: VisualizationProps): JSX.Element {
  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer
        nodes={useSelector((state: GlobalState) => transformToBasicNodes(state.nlpData.nodes))}
        relationships={useSelector((state: GlobalState) => transformToBasicRelationships(state.nlpData.links))}
        assignVisElement={props.assignVisElement}
      />
    </StyledVisContainer>
  );
}

/**
 * Converts the obtained nodes type to Basic type
 *
 * @param nodes A list of nodes in common format
 *
 * @returns BasicNode array
 */
export const transformToBasicNodes = (nodes: any[]): BasicNode[] => {
  return nodes.map((node: any) => {
    return {
      id: node["id"],
      labels: [node["fields"]["type"] ? node["fields"]["type"] : ALL_NODE_LABELS_SETS],
      properties: { name: node["fields"]["name"] ? node["fields"]["name"] : node["id"] },
      propertyTypes: { name: "string" },
    };
  });
};

/**
 * Converts the obtained links type to Basic type
 *
 * @param links A list of links in common format
 *
 * @returns BasicRelationship array
 */
export const transformToBasicRelationships = (links: any[]): BasicRelationship[] => {
  return links.map((link: any) => {
    return {
      id: link["fields"]["label"] ? link["fields"]["label"] : `${link["source"]}To${link["target"]} `,
      startNodeId: link["source"],
      endNodeId: link["target"],
      type: link["fields"]["label"] ? link["fields"]["label"] : ALL_REL_TYPE_SETS,
      properties: { name: link["fields"]["label"] ? link["fields"]["label"] : ALL_REL_TYPE_SETS },
      propertyTypes: { name: "string" },
    };
  });
};
