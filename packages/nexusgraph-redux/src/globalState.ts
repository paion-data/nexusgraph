// Copyright 2023 Paion Data. All rights reserved.
import { INTELLIGENT_AI_STATE as intelligentAI } from "./intelligentAI/intelligentAIDuck";
import { NlpState, NLP_DATA as nlpData } from "./nlp/nlpDuck";
import { NoteInfo, NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import { NoteState, NOTE_STATE as note } from "./note/noteDuck";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export interface GlobalState {
  [nlpData]: NlpState;
  [note]: NoteState;
  [oAuth]: OAuthState;
  [noteList]: NoteInfo[];
  [intelligentAI]: string[];
}
