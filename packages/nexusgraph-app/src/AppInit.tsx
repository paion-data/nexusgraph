// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import OAuth2Provider from "../../nexusgraph-oauth/src/OAuth2Provider";
import { ReduxStoreProvider } from "../../nexusgraph-redux";
import DevApp from "./DevApp";
import ProdApp from "./ProdApp";

/**
 * {@link AppInit} offers common init/config and differentiated context wrapper for {@link DevApp | dev} and
 * {@link ProdApp | prod} instances.
 */
export default function AppInit(): JSX.Element {
  if (process.env.SKIP_SIGN_IN == "true") {
    return (
      <ReduxStoreProvider>
        <DevApp />
      </ReduxStoreProvider>
    );
  }

  return (
    <ReduxStoreProvider>
      <OAuth2Provider>
        <ProdApp />
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
