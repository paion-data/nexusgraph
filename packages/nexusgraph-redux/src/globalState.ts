// Copyright 2023 Paion Data. All rights reserved.
import { NlpState, NLP_DATA as nlpData } from "./nlp/nlpTypes";
import { NoteState, NOTE_STATE as note } from "./note/noteTypes";
import { OAuth2State, OAUTH2_STATE as oAuth2 } from "./oAuth2/oAuth2Type";

export interface GlobalState {
  [nlpData]: NlpState;
  [note]: NoteState;
  [oAuth2]: OAuth2State;
}
