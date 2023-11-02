// Copyright 2023 Paion Data. All rights reserved.
import graphReducer, { GRAPH_DATA as graphData } from "./graph/graphDuck";
import noteListReducer, { NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import noteReducer, { NOTE_STATE as note } from "./note/noteDuck";
import oAuthReducer, { OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export default {
  [graphData]: graphReducer,
  [note]: noteReducer,
  [oAuth]: oAuthReducer,
  [noteList]: noteListReducer,
};
