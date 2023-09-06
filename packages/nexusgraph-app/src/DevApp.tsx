// Copyright 2023 Paion Data. All rights reserved.
import { useDevOAuth2 } from "../../nexusgraph-oauth2/src/useOAuth2";
import App from "./App";

export default function DevApp(): JSX.Element {
  return <App oauthContext={useDevOAuth2()} />;
}
