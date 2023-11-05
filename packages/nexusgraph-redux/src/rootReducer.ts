// Copyright 2023 Paion Data. All rights reserved.
import graphReducer, { GRAPH_DATA as graphData } from "./graph/graphDuck";
import noteListReducer, { NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import oAuthReducer, { OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export default {
  [graphData]: graphReducer,
  [oAuth]: oAuthReducer,
  [noteList]: noteListReducer,
};
