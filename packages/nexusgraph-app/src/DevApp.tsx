// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";

interface DevAppProps {
  initReduxStore: (userId: string, astraiosClient: AstraiosClient, dispatch: any) => void;
}

/**
 * The {@link DevApp} does not involve OAuth2 authentication and authorization.
 *
 * All prod configurations are put here
 *
 * @returns DOM
 */
export default function DevApp(props: DevAppProps): JSX.Element {
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

  props.initReduxStore(devUserId, new AstraiosClient(devUserId, devToken), dispatch);

  return <App />;
}
