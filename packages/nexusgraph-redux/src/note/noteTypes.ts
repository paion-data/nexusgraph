// Copyright 2023 Paion Data. All rights reserved.
import { GraphState } from "../..";

export const NOTE_STATE = "note";
export const UPDATE_NOTE_ID = NOTE_STATE + "/UPDATE_NOTE_ID";
export const UPDATE_NOTE_GRAPH = NOTE_STATE + "/UPDATE_NOTE_GRAPH";
export const UPDATE_NOTE_EDITOR_CONTENT = NOTE_STATE + "/UPDATE_NOTE_EDITOR_CONTENT";
export const CREATE_NEW_NOTE = NOTE_STATE + "/CREATE_NEW_NOTE";

export interface NoteState {
  id: string;
  editorContent: object;
  graph: GraphState;
}

export interface NoteAction {
  type: typeof NOTE_STATE;
  payload: string;
}
