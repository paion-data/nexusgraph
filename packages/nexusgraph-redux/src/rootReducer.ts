// Copyright 2023 Paion Data. All rights reserved.
import graphListReducer, { GRAPH_LIST_STATE as graphList } from "./graph-list/graphListDuck";
import graphReducer, { GRAPH_DATA as graphData } from "./graph/graphDuck";
import oAuthReducer, { OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export default {
  [graphData]: graphReducer,
  [oAuth]: oAuthReducer,
  [graphList]: graphListReducer,
};
