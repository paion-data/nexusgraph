// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { updateGraphList, updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";

/**
 * The {@link DevApp} does not involve OAuth2 authentication and authorization.
 *
 * All prod configurations are put here
 *
 * @returns DOM
 */
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

  const astraiosClient = new AstraiosClient(devUserId, devToken);

  astraiosClient.getGraphListMetaDataByUserId(devUserId).then((response) => {
    dispatch(
      updateGraphList(
        response.data.data.graph["edges"].map((nodeJson: { [x: string]: { [x: string]: any } }) => ({
          id: nodeJson["node"]["id"],
          name: nodeJson["node"]["name"],
        }))
      )
    );
  });

  return <App />;
}
