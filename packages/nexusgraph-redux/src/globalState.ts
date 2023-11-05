// Copyright 2023 Paion Data. All rights reserved.
import { GraphState, GRAPH_DATA as graphData } from "./graph/graphDuck";
import { NoteInfo, NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export interface GlobalState {
  [graphData]: GraphState;
  [oAuth]: OAuthState;
  [noteList]: NoteInfo[];
}
