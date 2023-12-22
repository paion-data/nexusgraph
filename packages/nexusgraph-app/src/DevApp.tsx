// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { GraphClient, JsonGraphQLServerClient } from "../../nexusgraph-db";
import { updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";
import { GraphClientContext } from "./Contexts";

interface DevAppProps {
  initReduxStore: (userId: string, graphClient: GraphClient, dispatch: any) => void;
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
  const devUserId = process.env.DEV_USER_ID as string;
  const devUserInfo = { sub: devUserId };

  dispatch(
    updateOAuthState({
      accessToken: devToken,
      userInfo: devUserInfo,
    })
  );

  const graphClient = new JsonGraphQLServerClient(devUserId);
  props.initReduxStore(devUserId, graphClient, dispatch);

  return (
    <GraphClientContext.Provider value={graphClient}>
      <App />
    </GraphClientContext.Provider>
  );
}
