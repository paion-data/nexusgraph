// Copyright 2023 Paion Data. All rights reserved.
export const NOTE_STATE = "astraios";
export const UPDATE_NOTE_ID = NOTE_STATE + "/UPDATE_NOTE_ID";
export const UPDATE_NOTE_GRAPH = NOTE_STATE + "/UPDATE_NOTE_GRAPH";
export const UPDATE_NOTE_EDITOR_CONTENT = NOTE_STATE + "/UPDATE_NOTE_EDITOR_CONTENT";

export interface AstraiosState {
  data: {
    type: "note";
    id: String;
    attributes: {
      graph: String;
      editorContent: String;
    };
  };
}

export interface AstraiosAction {
  type: typeof NOTE_STATE;
  payload: string;
}
