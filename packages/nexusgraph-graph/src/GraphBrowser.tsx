// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import i18next from "i18next";
import {
  DETAILS_PANE_TITLE_UPDATE,
  GraphInteractionCallBack,
  GraphVisualizer,
  NODE_LABEL_UPDATE,
  NODE_ON_CANVAS_CREATE,
  PROP_UPDATE,
  REL_ON_CANVAS_CREATE,
  REL_TYPE_UPDATE,
  resources,
} from "neo4j-devtools-arc";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GraphClientContext } from "../../nexusgraph-app/src/Contexts";
import { GraphClient } from "../../nexusgraph-db";
import { Link, Node, selectGraphData, updateGraphData } from "../../nexusgraph-redux";
import { addLink, addNode, mutateLinkFieldById, mutateNodeFieldById } from "./immutable";
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
  const graphClient: GraphClient = useContext(GraphClientContext) as GraphClient;

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

      const newGraphState = addNode(graphData, {
        id: Math.random().toString(36).slice(2),
        fields: {
          name: properties["name"],
          description: properties["description"],
          labels: properties["labels"],
        },
      } as Node);

      dispatch(updateGraphData(newGraphState));
      graphClient.saveOrUpdate(newGraphState);
    }

    if (event == NODE_LABEL_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_LABEL_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const nodeId = properties["nodeId"];
      const newLabel = properties["newLabel"];
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

      const newGraphState = addLink(graphData, {
        id: properties["type"],
        source: properties["sourceNodeId"],
        target: properties["targetNodeId"],
        fields: {
          type: properties["type"],
        },
      } as Link);

      dispatch(updateGraphData(newGraphState));
      graphClient.saveOrUpdate(newGraphState);
    }

    if (event == REL_TYPE_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (REL_TYPE_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const relId = properties["relId"] as string;
      const newType = properties["newType"] as string;

      const newGraphData = mutateLinkFieldById(graphData, relId, "type", newType);

      dispatch(updateGraphData(newGraphData));
      graphClient.saveOrUpdate(newGraphData);
    }

    if (event == PROP_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_PROP_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const isNode = properties["isNode"];
      const nodeOrRelId = properties["nodeOrRelId"] as string;
      const propKey = properties["propKey"] as string;
      const propVal = properties["propVal"] as string;

      const newGraphData = isNode
        ? mutateNodeFieldById(graphData, nodeOrRelId, propKey, propVal)
        : mutateLinkFieldById(graphData, nodeOrRelId, propKey, propVal);

      dispatch(updateGraphData(newGraphData));
      graphClient.saveOrUpdate(newGraphData);
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
      const nodeOrRelId = properties["nodeOrRelId"] as string;
      const titlePropertyKey = properties["titlePropertyKey"] as string;
      const newTitle = properties["newTitle"] as string;

      const newGraphData = isNode
        ? mutateNodeFieldById(graphData, nodeOrRelId, titlePropertyKey, newTitle)
        : mutateLinkFieldById(graphData, nodeOrRelId, titlePropertyKey, newTitle);

      dispatch(updateGraphData(newGraphData));
      graphClient.saveOrUpdate(newGraphData);
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
        showPropertiesTable={false}
      />
    </ThemeProvider>
  );
}
