// Copyright 2023 Paion Data. All rights reserved.
import { NAME as editor, GraphEditorState } from "../types";
import { NAME as editorLine } from "../../src/shared/editorLine/editorLineDuck";

export interface GlobalState {
  [editor]: GraphEditorState;
  [editorLine]: string[];
}
