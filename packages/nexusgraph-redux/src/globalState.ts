// Copyright 2023 Paion Data. All rights reserved.
import { NlpState, NLP_DATA as nlpData } from "./nlp/nlpTypes";
import { NoteState, NOTE_STATE as note } from "./note/noteTypes";

export interface GlobalState {
  [nlpData]: NlpState;
  [note]: NoteState;
}
