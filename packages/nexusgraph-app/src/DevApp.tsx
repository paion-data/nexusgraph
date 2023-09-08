// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { OAuthState, UPDATE_OAUTH_STATE } from "../../nexusgraph-redux/src/oAuth/oAuthType";
import App from "./App";

export default function DevApp(): JSX.Element {
  const dispatch = useDispatch();

  const devOAuthState: OAuthState = {
    accessToken: "dev token",
    userInfo: {},
  };

  dispatch({ type: UPDATE_OAUTH_STATE, payload: devOAuthState });

  return <App />;
}
