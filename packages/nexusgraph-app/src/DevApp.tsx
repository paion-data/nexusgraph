// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { updateOAuthState } from "../../nexusgraph-redux";
import { container, TYPES } from "../inversify.config";
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
  container.bind<string>(TYPES.accessToken).toConstantValue(devToken);
  container.bind<string>(TYPES.userId).toConstantValue(devUserId);

  return <App />;
}
