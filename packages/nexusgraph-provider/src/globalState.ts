// Copyright 2023 Paion Data. All rights reserved.
import { NLP_DATA as nlpData, NlpState, EDITOR_STATE as editor } from "./types";
import { AstraiosState, NOTE_STATE as astraios } from "./astraios/astraiosTypes";

export interface GlobalState {
  [nlpData]: NlpState;
  [editor]: object;
  [astraios]: AstraiosState;
}
