// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { OAuth2State, UPDATE_OAUTH2_STATE } from "../../nexusgraph-redux/src/oAuth2/oAuth2Type";
import App from "./App";

export default function DevApp(): JSX.Element {
  const dispatch = useDispatch();

  const devOAuthState: OAuth2State = {
    isLoading: true,
    isAuthenticated: true,
    accessToken: "dev token",
    userInfo: {},
  };

  dispatch({ type: UPDATE_OAUTH2_STATE, payload: devOAuthState });

  return <App />;
}
