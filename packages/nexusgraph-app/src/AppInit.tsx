// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { AstraiosClient } from "../../nexusgraph-astraios";
import OAuth2Provider from "../../nexusgraph-oauth/src/OAuth2Provider";
import { ReduxStoreProvider, updateGraphData, updateGraphList } from "../../nexusgraph-redux";
import DevApp from "./DevApp";
import ProdApp from "./ProdApp";

/**
 * {@link AppInit} offers common init/config and differentiated context wrapper for {@link DevApp | dev} and
 * {@link ProdApp | prod} instances.
 *
 * It defines init execution logics but does execute it. Instead, {@link DevApp} or {@link ProdApp} executes them.
 */
export default function AppInit(): JSX.Element {
  const initReduxStore = (userId: string, astraiosClient: AstraiosClient, dispatch: any) => {
    astraiosClient.getGraphListMetaDataByUserId(userId).then((response) => {
      const graphList = response.data.data.graph["edges"].map((nodeJson: { [x: string]: { [x: string]: any } }) => ({
        id: nodeJson["node"]["id"],
        name: nodeJson["node"]["name"],
      }));
      dispatch(updateGraphList(graphList));

      if (graphList.length > 0) {
        astraiosClient.getGraphById(graphList[0].id).then((response) => {
          const graph = response.data.data.graph.edges[0].node;
          dispatch(
            updateGraphData({
              id: graph.id,
              name: graph.name,
              nodes: JSON.parse(graph.graph).nodes,
              links: JSON.parse(graph.graph).links,
            })
          );
        });
      }
    });
  };

  if (process.env.SKIP_SIGN_IN == "true") {
    return (
      <ReduxStoreProvider>
        <DevApp initReduxStore={initReduxStore} />
      </ReduxStoreProvider>
    );
  }

  return (
    <ReduxStoreProvider>
      <OAuth2Provider>
        <ProdApp initReduxStore={initReduxStore} />
      </OAuth2Provider>
    </ReduxStoreProvider>
  );
}

/**
 * Connects to Nexus Graph's monitoring system
 */
export function setupSentry(): void {
  Sentry.init({
    dsn: process.env.SENTRY_IO_DSN as string,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: [/^https:\/\/app\.nexusgraph\.com/],
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
