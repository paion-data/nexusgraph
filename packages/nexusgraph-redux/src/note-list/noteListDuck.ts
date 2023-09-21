// Copyright 2023 Paion Data. All rights reserved.
export const NOTE_LIST_STATE = "noteList";
const UPDATE_NOTE_LIST = NOTE_LIST_STATE + "/UPDATE_NOTE_LIST";

export interface NoteInfo {
  id: string;
  title: string;
}

interface NoteListAction {
  type: typeof NOTE_LIST_STATE;
  payload: NoteInfo[];
}

const initialState: NoteInfo[] = [];

/**
 * Used to update the notes title directory
 *
 * @param state The current {@link NoteInfo[]}
 * @param action {@link NoteListAction} for updating a directory
 *
 * @returns New directory state
 */
export default function noteListReducer(state = initialState, action: NoteListAction): NoteInfo[] {
  switch (action.type) {
    case UPDATE_NOTE_LIST:
      return action.payload;
    default:
      return state;
  }
}

export function updateNoteList(noteListState: NoteInfo[]) {
  return { type: UPDATE_NOTE_LIST, payload: noteListState };
}
