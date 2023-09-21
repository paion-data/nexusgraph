// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { OAuthState, updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";

export default function DevApp(): JSX.Element {
  const dispatch = useDispatch();

  const devOAuthState: OAuthState = {
    accessToken: "devToken",
    userInfo: { sub: "devUserId" },
  };

  dispatch(updateOAuthState(devOAuthState));

  return <App />;
}
