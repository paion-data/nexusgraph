import nlpReducer from "./nlp/nlpDuck";
import editorReducer from "./editor/editorDuck";
import { NLP_DATA as nlpData, EDITOR_STATE as editor } from "./types";

export default {
  [nlpData]: nlpReducer,
  [editor]: editorReducer,
};
