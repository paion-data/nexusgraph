// Copyright 2023 Paion Data. All rights reserved.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useLogto } from "@logto/react";
import * as Sentry from "@sentry/react";

import App from "./App";
import { Callback } from "./LogtoProvider";

export default function ProdApp(): JSX.Element {
  if (process.env.SENTRY_IO_DSN) {
    setupSentry();
  }

  const { signIn, isAuthenticated } = useLogto();

  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Callback />} />
        </Routes>
      </Router>
    );
  }

  if (process.env.NODE_ENV == "production") {
    signIn("https://app.nexusgraph.com/login");
  }

  return <></>; // this line never reaches
}

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
