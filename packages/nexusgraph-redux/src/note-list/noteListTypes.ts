// Copyright 2023 Paion Data. All rights reserved.
export const NOTE_LIST_STATE = "noteList";
export const UPDATE_NOTE_LIST = NOTE_LIST_STATE + "/UPDATE_NOTE_LIST";

export interface NoteInfo {
  id: string;
  title: string;
}

export interface NoteListAction {
  type: typeof NOTE_LIST_STATE;
  payload: NoteInfo[];
}
