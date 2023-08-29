// Copyright 2023 Paion Data. All rights reserved.
import { NLP_DATA as nlpData, NlpState } from "./nlp/nlpTypes";
import { EDITOR_STATE as editor } from "./editor/editorTypes";
import { AstraiosState, NOTE_STATE as astraios } from "./astraios/astraiosTypes";

export interface GlobalState {
  [nlpData]: NlpState;
  [editor]: object;
  [astraios]: AstraiosState;
}
