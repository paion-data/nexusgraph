// Copyright 2023 Paion Data. All rights reserved.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useLogto } from "@logto/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Callback } from "../../nexusgraph-oauth";
import { updateOAuthState } from "../../nexusgraph-redux";
import { container, TYPES } from "../inversify.config";
import ProdAppContent from "./ProdAppContent";

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
    const astraiosAPI = process.env.ASTRAIOS_API_RESOURCE as string;
    getAccessToken(astraiosAPI).then((token) => {
      if (token) {
        prodOAuthState["accessToken"] = token;
        fetchUserInfo().then((userInfo) => {
          if (userInfo) {
            prodOAuthState["userInfo"]["sub"] = userInfo["sub"];
            dispatch(updateOAuthState(prodOAuthState));

            container.bind<string>(TYPES.accessToken).toConstantValue(token);
            container.bind<string>(TYPES.userId).toConstantValue(userInfo["sub"]);
          }
        });
      }
    });
  }, [JSON.stringify(prodOAuthState)]);

  if (!isAuthenticated && !isLoading) {
    signIn(process.env.LOGTO_SIGN_IN_CALLBACK_URL as string);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProdAppContent isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
