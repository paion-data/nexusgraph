import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData, EDITOR_LINE as editorLines } from "./types";
import editorReducer from "./editorLine/editorLineDuck";

export default {
  [nlpData]: nlpReducer,
  [editorLines]: editorReducer,
};
