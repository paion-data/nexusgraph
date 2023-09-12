// Copyright 2023 Paion Data. All rights reserved.
import { NlpState, NLP_DATA as nlpData } from "./nlp/nlpTypes";
import { NoteState, NOTE_STATE as note } from "./note/noteTypes";
import { OAuthState, OAUTH_STATE as oAuth } from "./oAuth/oAuthType";
import { DirectoryState, DIRECTORY_STATE as directory } from "./titles-directory/directoryTypes";

export interface GlobalState {
  [nlpData]: NlpState;
  [note]: NoteState;
  [oAuth]: OAuthState;
  [directory]: DirectoryState;
}
