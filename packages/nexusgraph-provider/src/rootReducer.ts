import nlpReducer from "./nlp/nlpDuck";
import editorReducer from "./editor/editorDuck";
import { NLP_DATA as nlpData, EDITOR_STATE as editor } from "./types";
import { NOTE_STATE as astraios } from "./astraios/astraiosTypes";
import astraiosReducer from "./astraios/astraiosDuck";

export default {
  [nlpData]: nlpReducer,
  [editor]: editorReducer,
  [astraios]: astraiosReducer,
};
