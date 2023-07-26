import Reducer from "./nlp/nlpDuck";
import { NAME as editor } from "../types";
import editorReducer from "./editorLine/editorLineDuck";
import { NAME as editorLines } from "./editorLine/editorLineDuck";

export default {
  [editor]: Reducer,
  [editorLines]: editorReducer,
};
