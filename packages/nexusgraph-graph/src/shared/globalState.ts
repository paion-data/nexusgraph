// Copyright 2023 Paion Data. All rights reserved.
import { NAME as editor, GraphEditorState } from "./editor/editorDuck";

export interface GlobalState {
  [editor]: GraphEditorState;
}
