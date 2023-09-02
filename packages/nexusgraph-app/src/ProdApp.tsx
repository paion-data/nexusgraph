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
  const { signIn, isAuthenticated, isLoading } = useOAuth2();

  if (!isAuthenticated && !isLoading) {
    // isAuthenticated handles regular authentication
    // isLoading will be true is it's a redirect hit from Logto so that it will fall through to local redirect below
    signIn(process.env.SIGN_IN_REDIRECT_URL as string);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App oauthContext={useOAuth2()} />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
