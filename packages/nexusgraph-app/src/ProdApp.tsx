// Copyright 2023 Paion Data. All rights reserved.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useLogto } from "@logto/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Callback } from "../../nexusgraph-oauth";
import { updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";
import Loadingpage from "./Loadingpage";

/**
 * The {@link ProdApp} involves OAuth2 authentication and authorization.
 *
 * @returns
 */
export default function ProdApp(): JSX.Element {
  const dispatch = useDispatch();

  const { signIn, isAuthenticated, isLoading, getAccessToken, fetchUserInfo } = useLogto();

  const prodOAuthState = {
    accessToken: "",
    userInfo: { sub: "prodUserId" },
  };

  useEffect(() => {
    getAccessToken(process.env.ASTRAIOS_API_RESOURCE as string).then((token) => {
      if (token) {
        prodOAuthState["accessToken"] = token;
        fetchUserInfo().then((userInfo) => {
          if (userInfo) {
            prodOAuthState["userInfo"]["sub"] = userInfo["sub"];
            dispatch(updateOAuthState(prodOAuthState));
          }
        });
      }
    });
  }, [JSON.stringify(prodOAuthState)]);

  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    );
  }

  if (!isAuthenticated && !isLoading) {
    signIn(process.env.LOGTO_SIGN_IN_CALLBACK_URL as string);
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/" element={<Loadingpage />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
