// Copyright 2023 Paion Data. All rights reserved.
export const NOTE_STATE = "note";
export const UPDATE_NOTE_ID = NOTE_STATE + "/UPDATE_NOTE_ID";
export const UPDATE_NOTE_GRAPH = NOTE_STATE + "/UPDATE_NOTE_GRAPH";
export const UPDATE_NOTE_EDITOR_CONTENT = NOTE_STATE + "/UPDATE_NOTE_EDITOR_CONTENT";
export const CREATE_NEW_NOTE = NOTE_STATE + "/CREATE_NEW_NOTE";
export const UPDATE_NOTE = NOTE_STATE + "/NOTE_STATE";

export interface NoteState {
  id: string;
  editorContent: string;
  graph: string;
}

export interface NoteAction {
  type: typeof NOTE_STATE;
  payload: string;
}
