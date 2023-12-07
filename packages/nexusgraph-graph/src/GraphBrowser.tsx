// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import i18next from "i18next";
import { produce } from "immer";
import {
  DETAILS_PANE_TITLE_UPDATE,
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
import { GraphState, Link, Node, selectGraphData, selectOAuth, updateGraphData } from "../../nexusgraph-redux";
import { mapToBasicNodes, mapToBasicRelationships } from "./mappers";
import { theme } from "./themes";

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
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
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
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      graphData.links = [
        ...graphData.links,
        ...[
          {
            id: properties["type"],
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

    if (event == DETAILS_PANE_TITLE_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (DETAILS_PANE_TITLE_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const isNode = properties["isNode"];
      const nodeOrRelId = properties["nodeOrRelId"];
      const titlePropertyKey = properties["titlePropertyKey"];
      const newTitle = properties["newTitle"] as string;

      let newGraphData: GraphState = { id: graphData.id, name: graphData.name, nodes: [], links: [] };

      if (isNode) {
        newGraphData = produce(graphData, (draft) => {
          draft.nodes.forEach((node) => {
            if (node.id == nodeOrRelId) {
              node.fields[`${titlePropertyKey}`] = newTitle;
            }
          });
        });
      } else {
        newGraphData = produce(graphData, (draft) => {
          draft.links.forEach((link) => {
            if (link.id == nodeOrRelId) {
              link.fields[`${titlePropertyKey}`] = newTitle;
              newGraphData.links.push(link);
            }
          });
        });
      }

      dispatch(updateGraphData(newGraphData));
      astraiosClient.saveOrUpdate(newGraphData);
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
        nodes={mapToBasicNodes(graphData.nodes)}
        autocompleteRelationships={false}
        relationships={mapToBasicRelationships(graphData.links)}
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
