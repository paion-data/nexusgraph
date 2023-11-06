// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";

export default function DevApp(): JSX.Element {
  const dispatch = useDispatch();

  const devToken = "devToken";
  const devUserId = "devUserId";
  const devUserInfo = { sub: devUserId };

  dispatch(
    updateOAuthState({
      accessToken: devToken,
      userInfo: devUserInfo,
    })
  );

  return <App />;
}
