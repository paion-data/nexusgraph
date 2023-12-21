// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { I18nextProvider } from "react-i18next";
import { GraphClient } from "../../nexusgraph-db";
import OAuth2Provider from "../../nexusgraph-oauth/src/OAuth2Provider";
import { ReduxStoreProvider, updateGraphData, updateGraphList } from "../../nexusgraph-redux";
import DevApp from "./DevApp";
import i18n from "./i18n";
import ProdApp from "./ProdApp";

/**
 * {@link AppInit} offers common init/config and differentiated context wrapper for {@link DevApp | dev} and
 * {@link ProdApp | prod} instances.
 *
 * It defines init execution logics but does execute it. Instead, {@link DevApp} or {@link ProdApp} executes them.
 */
export default function AppInit(): JSX.Element {
  const initReduxStore = (userId: string, graphClient: GraphClient, dispatch: any) => {
    graphClient.getGraphListMetaDataByUserId(userId).then((metaDataList) => {
      if (metaDataList.length <= 0) {
        return;
      }

      dispatch(updateGraphList(metaDataList));

      graphClient.getGraphById(metaDataList[0].id).then((graphState) => {
        dispatch(
          updateGraphData({
            id: graphState.id,
            name: graphState.name,
            nodes: graphState.nodes,
            links: graphState.links,
          })
        );
      });
    });
  };

  if (process.env.SKIP_SIGN_IN == "true") {
    return (
      <I18nextProvider i18n={i18n}>
        <ReduxStoreProvider>
          <DevApp initReduxStore={initReduxStore} />
        </ReduxStoreProvider>
      </I18nextProvider>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxStoreProvider>
        <OAuth2Provider>
          <ProdApp initReduxStore={initReduxStore} />
        </OAuth2Provider>
      </ReduxStoreProvider>
    </I18nextProvider>
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
