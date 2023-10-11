// Copyright 2023 Paion Data. All rights reserved.
import { NAME as editor, GraphEditorState } from "./editor/editorDuck";
import { NAME as visualization, VisualizationDataState } from "./visualizationView/visualizationDuck";

export interface GlobalState {
  [editor]: GraphEditorState;
  [visualization]: VisualizationDataState;
}
