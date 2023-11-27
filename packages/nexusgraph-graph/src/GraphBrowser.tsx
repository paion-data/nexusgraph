// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import i18next from "i18next";
import {
  BasicNode,
  BasicRelationship,
  GraphInteractionCallBack,
  GraphVisualizer,
  NODE_ON_CANVAS_CREATE,
  REL_ON_CANVAS_CREATE,
  resources,
} from "neo4j-devtools-arc";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { Link, Node, selectGraphData, selectOAuth, updateGraphData } from "../../nexusgraph-redux";
import { theme } from "./themes";

const ALL_REL_TYPE_SETS = "*";
const DISPLAYED_FIELD = "type";
const ALL_NODE_LABELS_SETS = "*";

/**
 * {@link GraphBrowser} abstracts away the graphing capabilities of Nexus Graph and is the "config" component on top of
 * neo4j-arc graphing library.
 *
 * It is logically the same component as neo4j-browser's VisualizationView.tsx
 *
 * @returns a React DOM object
 */
export default function GraphBrowser(): JSX.Element {
  const dispatch = useDispatch();

  const isFullscreen = true;
  const graphData = selectGraphData();
  const userId = selectOAuth().userInfo.sub;
  const accessToken = selectOAuth().accessToken;
  const astraiosClient = new AstraiosClient(userId, accessToken);

  const [hasVis, setHasVis] = useState<boolean>(true);
  const [visElement, setVisElement] = useState<null | {
    svgElement: unknown;
    graphElement: unknown;
    type: "plan" | "graph";
  }>(null);

  const onGraphInteraction: GraphInteractionCallBack = (event, properties) => {
    if (event == NODE_ON_CANVAS_CREATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_ON_CANVAS_CREATE) is null. " +
            "This might be graph modeling logic change is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      graphData.nodes = [
        ...graphData.nodes,
        ...[
          {
            id: Math.random().toString(36).slice(2),
            fields: {
              name: properties["name"],
              description: properties["description"],
              labels: properties["labels"],
            },
          } as Node,
        ],
      ];

      dispatch(updateGraphData(graphData));
      astraiosClient.saveOrUpdate(graphData);
    }

    if (event == REL_ON_CANVAS_CREATE) {
      if (properties == null) {
        const error = new Error(
          "properties (REL_ON_CANVAS_CREATE) is null. " +
            "This might be graph modeling logic change is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      graphData.links = [
        ...graphData.links,
        ...[
          {
            source: properties["sourceNodeId"],
            target: properties["targetNodeId"],
            fields: {
              type: properties["type"],
            },
          } as Link,
        ],
      ];

      dispatch(updateGraphData(graphData));
      astraiosClient.saveOrUpdate(graphData);
    }
  };

  i18next.addResources("en", "translation", resources.en.translation);
  i18next.addResources("zh", "translation", resources.zh.translation);

  const themeData = theme;

  return (
    <ThemeProvider theme={themeData}>
      <GraphVisualizer
        maxNeighbours={100}
        hasTruncatedFields={false}
        // graphStyleData={undefined}
        // updateStyle={undefined}
        // getNeighbours={undefined}
        nodes={transformBasicNodes(graphData.nodes)}
        autocompleteRelationships={false}
        relationships={transformBasicRelationships(graphData.links)}
        isFullscreen={isFullscreen}
        assignVisElement={(svgElement: any, graphElement: any) => {
          setVisElement({ svgElement, graphElement, type: "graph" });
          setHasVis(true);
        }}
        nodeLimitHit={false}
        getAutoCompleteCallback={undefined}
        // setGraph={undefined}
        // setNodePropertiesExpandedByDefault={undefined}
        // nodePropertiesExpandedByDefault={true}
        wheelZoomRequiresModKey={!isFullscreen}
        wheelZoomInfoMessageEnabled={false}
        // disableWheelZoomInfoMessage={() => {}}
        // DetailsPaneOverride={undefined}
        // OverviewPaneOverride={undefined}
        useGeneratedDefaultColors={false}
        initialZoomToFit={true}
        onGraphInteraction={onGraphInteraction}
      />
    </ThemeProvider>
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
