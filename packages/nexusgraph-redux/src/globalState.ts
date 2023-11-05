// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData, GRAPH_LIST_STATE as graphList } from "./graph-list/graphListDuck";
import { GraphState, GRAPH_DATA as graphData } from "./graph/graphDuck";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export interface GlobalState {
  [graphData]: GraphState;
  [oAuth]: OAuthState;
  [graphList]: GraphMetaData[];
}
