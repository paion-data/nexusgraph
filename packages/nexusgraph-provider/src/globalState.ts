// Copyright 2023 Paion Data. All rights reserved.
import { NLP_DATA as nlpData, NlpState, EDITOR_LINE as editorLine } from "./types";

export interface GlobalState {
  [nlpData]: NlpState;
  [editorLine]: string[];
}
