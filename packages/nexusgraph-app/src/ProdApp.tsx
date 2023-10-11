// Copyright 2023 Paion Data. All rights reserved.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Callback, useOAuth2 } from "../../nexusgraph-oauth2";
import App from "./App";

/**
 * The {@link ProdApp} involves OAuth2 authentication and authorization.
 *
 * @returns
 */
export default function ProdApp(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App oauthContext={useOAuth2()} />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
