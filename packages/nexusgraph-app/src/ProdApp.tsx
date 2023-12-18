// Copyright 2023 Paion Data. All rights reserved.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useLogto } from "@logto/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { Callback } from "../../nexusgraph-oauth";
import { updateOAuthState } from "../../nexusgraph-redux";
import ProdAppContent from "./ProdAppContent";

interface ProdAppProps {
  initReduxStore: (userId: string, astraiosClient: AstraiosClient, dispatch: any) => void;
}

/**
 * The {@link ProdApp} involves OAuth2 authentication and authorization.
 *
 * All prod configurations are put here
 *
 * @returns DOM
 */
export default function ProdApp(props: ProdAppProps): JSX.Element {
  const dispatch = useDispatch();

  const { signIn, signOut, isAuthenticated, isLoading, getAccessToken, fetchUserInfo, error } = useLogto();

  if (error && isAuthenticated) {
    signOut(process.env.LOGTO_SIGN_OUT_REDIRECT_URL as string);
  }

  if (!isAuthenticated && !isLoading) {
    signIn(process.env.LOGTO_SIGN_IN_CALLBACK_URL as string);
  }

  useEffect(() => {
    const astraiosAPI = process.env.ASTRAIOS_API_RESOURCE as string;
    getAccessToken(astraiosAPI).then((token: string) => {
      fetchUserInfo().then((userInfo: any) => {
        dispatch(
          updateOAuthState({
            accessToken: token,
            userInfo: { sub: userInfo["sub"] },
          })
        );

        const userId = userInfo["sub"];
        const accessToken = token;
        props.initReduxStore(userId, new AstraiosClient(userId, accessToken), dispatch);
      });
    });
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProdAppContent isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
