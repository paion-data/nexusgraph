// Copyright 2023 Paion Data. All rights reserved.
import { GraphState, GRAPH_DATA as graphData } from "./graph/graphDuck";
import { NoteInfo, NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import { NoteState, NOTE_STATE as note } from "./note/noteDuck";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export interface GlobalState {
  [graphData]: GraphState;
  [note]: NoteState;
  [oAuth]: OAuthState;
  [noteList]: NoteInfo[];
}
