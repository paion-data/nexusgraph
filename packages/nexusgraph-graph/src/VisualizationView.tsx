// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { Node, selectGraphData, selectOAuth, updateGraphData } from "../../nexusgraph-redux";
import { BasicNode, BasicRelationship } from "./basicTypes";
import { GraphInteractionCallBack, NODE_ON_CANVAS_CREATE } from "./event-handler";
import { ALL_NODE_LABELS_SETS, ALL_REL_TYPE_SETS } from "./GraphStats";
import { GraphVisualizer } from "./GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";

export interface VisualizationProps {
  assignVisElement: (svgElement: any, graphElement: any) => void;
}

const DISPLAYED_FIELD = "type";

const astraiosClient = new AstraiosClient();

/**
 * {@link Visualization} is responsible for computing and passing the graph data to the components that draws the gaph,
 * i.e. {@link GraphVisualizer}
 *
 * It is also the "deepest" place in component tree to hold AstraiosClient and Redux state R/W
 *
 * @returns a DOM object
 */
export function Visualization(props: VisualizationProps): JSX.Element {
  const dispatch = useDispatch();
  const graphData = selectGraphData();
  const accessToken = selectOAuth().accessToken;
  const userId = selectOAuth().userInfo.sub;

  const onGraphInteraction: GraphInteractionCallBack = (event, properties) => {
    if (event == NODE_ON_CANVAS_CREATE) {
      if (properties == null) {
        const error = new Error('A property map with "newNode" key is required');
        Sentry.captureException(error);
        throw error;
      }

      astraiosClient.saveOrUpdate(graphData, userId, accessToken).then((response) => {
        graphData.id = response.data.data.graph.edges[0]["node"]["id"];
        graphData.nodes = [...graphData.nodes, properties["newNode"] as Node];
        dispatch(updateGraphData(graphData));
      });
    }
  };

  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer
        nodes={transformBasicNodes(graphData.nodes)}
        relationships={transformBasicRelationships(graphData.links)}
        assignVisElement={props.assignVisElement}
        onGraphInteraction={onGraphInteraction}
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
          properties: {
            name: node["fields"]["name"] ? node["fields"]["name"] : node["id"],
            url: node["fields"]["url"] ? node["fields"]["url"] : "null",
          },
          propertyTypes: { name: "string", url: "string" },
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
          id: link["fields"][DISPLAYED_FIELD]
            ? link["fields"][DISPLAYED_FIELD]
            : `${link["source"]}To${link["target"]} `,
          startNodeId: link["source"],
          endNodeId: link["target"],
          type: link["fields"][DISPLAYED_FIELD] ? link["fields"][DISPLAYED_FIELD] : ALL_REL_TYPE_SETS,
          properties: { name: link["fields"][DISPLAYED_FIELD] ? link["fields"][DISPLAYED_FIELD] : ALL_REL_TYPE_SETS },
          propertyTypes: { name: "string" },
        };
        links.splice(links.indexOf(link), 1, newLink);
      }
    });
  }
  return links;
};
