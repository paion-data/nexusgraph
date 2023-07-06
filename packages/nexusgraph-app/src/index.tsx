//Copyright 2023 Paion Data. All rights reserved.
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { GlobalState } from "../../nexusgraph-graph/src/shared/globalState";
import rootReducers from "../../nexusgraph-graph/src/shared/rootReducer";

import * as Sentry from "@sentry/react";

const reducer = combineReducers<GlobalState>({ ...(rootReducers as any) });
export const store = configureStore({ reducer });

setupSentry();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export function setupSentry(): void {
  Sentry.init({
    dsn: "SENTRY_IO_DSN_INJECTED_BY_CI_CD",
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ["localhost", /^https:\/\/app\.nexusgraph\.com/],
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
