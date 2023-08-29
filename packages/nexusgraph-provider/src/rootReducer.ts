import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData } from "./nlp/nlpTypes";
import editorReducer from "./editor/editorDuck";
import { EDITOR_STATE as editor } from "./editor/editorTypes";
import astraiosReducer from "./astraios/astraiosDuck";
import { NOTE_STATE as astraios } from "./astraios/astraiosTypes";

export default {
  [nlpData]: nlpReducer,
  [editor]: editorReducer,
  [astraios]: astraiosReducer,
};
