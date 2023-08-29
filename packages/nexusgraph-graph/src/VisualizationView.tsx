// Copyright 2023 Paion Data. All rights reserved.
import { GraphVisualizer } from "./GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";
import { BasicNode, BasicRelationship } from "./basicTypes";
import { ALL_NODE_LABELS_SETS, ALL_REL_TYPE_SETS } from "./GraphStats";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState, UPDATE_NOTE_GRAPH } from "../../nexusgraph-provider";
import { useEffect } from "react";

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
  const dispatch = useDispatch();

  const graph = {
    nodes: useSelector((state: GlobalState) => state.nlpData.nodes),
    links: useSelector((state: GlobalState) => state.nlpData.links),
  };

  useEffect(() => {
    dispatch({ type: UPDATE_NOTE_GRAPH, payload: JSON.stringify(graph) });
  }, [JSON.stringify(graph)]);

  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer
        nodes={useSelector((state: GlobalState) => transformBasicNodes(state.nlpData.nodes))}
        relationships={useSelector((state: GlobalState) => transformBasicRelationships(state.nlpData.links))}
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
export const transformBasicNodes = (nodes: any[]): BasicNode[] => {
  if (nodes.length > 0) {
    nodes.forEach((node: any) => {
      if (node["fields"]) {
        const newNode = {
          id: node["id"],
          labels: [node["fields"]["type"] ? node["fields"]["type"] : ALL_NODE_LABELS_SETS],
          properties: { name: node["fields"]["name"] ? node["fields"]["name"] : node["id"] },
          propertyTypes: { name: "string" },
        };
        nodes.splice(nodes.indexOf(node), 1, newNode);
      }
    });
  }
  return nodes;
};

/**
 * Converts the obtained links type to Basic type
 *
 * @param links A list of links in common format
 *
 * @returns BasicRelationship array
 */
export const transformBasicRelationships = (links: any[]): BasicRelationship[] => {
  if (links.length > 0) {
    links.forEach((link: any) => {
      if (link["fields"]) {
        const newLink = {
          id: link["fields"]["label"] ? link["fields"]["label"] : `${link["source"]}To${link["target"]} `,
          startNodeId: link["source"],
          endNodeId: link["target"],
          type: link["fields"]["label"] ? link["fields"]["label"] : ALL_REL_TYPE_SETS,
          properties: { name: link["fields"]["label"] ? link["fields"]["label"] : ALL_REL_TYPE_SETS },
          propertyTypes: { name: "string" },
        };
        links.splice(links.indexOf(link), 1, newLink);
      }
    });
  }
  return links;
};
