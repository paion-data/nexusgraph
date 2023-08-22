//Copyright 2023 Paion Data. All rights reserved.
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import * as Sentry from "@sentry/react";
import { StoreWrapper } from "../../nexusgraph-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogtoProviderWapper, { Callback } from "./LogtoProvider";
import "../../../i18n";

if (process.env.SENTRY_IO_DSN) {
  setupSentry();
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <StoreWrapper>
      <LogtoProviderWapper>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Callback />} />
          </Routes>
        </Router>
      </LogtoProviderWapper>
    </StoreWrapper>
  </StrictMode>
);

/**
 * Connects to Nexus Graph's monitoring system
 */
function setupSentry(): void {
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
