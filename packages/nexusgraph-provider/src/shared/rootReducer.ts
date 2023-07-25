import editorReducer from "./editor/editorDuck";
import { NAME as editor } from "../types"

export default {
  [editor]: editorReducer,
};
