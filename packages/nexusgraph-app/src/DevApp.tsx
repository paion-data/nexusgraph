// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { OAuthState, updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";
import { TYPES, container } from "../inversify.config";

export default function DevApp(): JSX.Element {
  const dispatch = useDispatch();

  const devToken = "devToken"
  const devUserId = "devUserId"
  const devUserInfo = { sub: devUserId };

  dispatch(updateOAuthState({
    accessToken: devToken,
    userInfo: devUserInfo,
  }));
  container.bind<string>(TYPES.accessToken).toConstantValue(devToken)
  container.bind<string>(TYPES.userId).toConstantValue(devUserId)

  return <App />;
}
