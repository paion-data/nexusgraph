// Copyright 2023 Paion Data. All rights reserved.
import { NlpState, NLP_DATA as nlpData } from "./nlp/nlpTypes";
import { NoteInfo, NOTE_LIST_STATE as noteList } from "./note-list/noteListTypes";
import { NoteState, NOTE_STATE as note } from "./note/noteTypes";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthType";

export interface GlobalState {
  [nlpData]: NlpState;
  [note]: NoteState;
  [oAuth]: OAuthState;
  [noteList]: NoteInfo[];
}
