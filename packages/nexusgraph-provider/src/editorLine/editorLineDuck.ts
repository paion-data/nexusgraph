// Copyright 2023 Paion Data. All rights reserved.
import { EditorAction, UPDATE_LINE } from "../types";

const initialState: string[] = [];

/**
 * Update editor lines state
 *
 * [Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers) are functions
 * that take the current state and an action as arguments
 *
 * @param state editor state
 * @param action editor action
 *
 * @returns New editor lines state
 */
export default function editorReducer(state = initialState, action: EditorAction) {
  switch (action.type) {
    case UPDATE_LINE:
      return action.payload;
    default:
      return state;
  }
}
