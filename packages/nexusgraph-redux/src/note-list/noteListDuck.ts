// Copyright 2023 Paion Data. All rights reserved.
import { NoteListAction, NoteListState, UPDATE_NOTE_LIST } from "./noteListTypes";

const initialState: NoteListState = [];

/**
 * Used to update the notes title directory
 *
 * @param state The current {@link NoteListState}
 * @param action {@link NoteListAction} for updating a directory
 *
 * @returns New directory state
 */
export default function noteListReducer(state = initialState, action: NoteListAction): NoteListState {
  switch (action.type) {
    case UPDATE_NOTE_LIST:
      return action.payload;
    default:
      return state;
  }
}
