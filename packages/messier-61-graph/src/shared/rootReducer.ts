import { combineReducers } from "redux";
import editorReducer, { NAME as editor } from "./editor/editorDuck";

export default {
  [editor]: editorReducer,
};
