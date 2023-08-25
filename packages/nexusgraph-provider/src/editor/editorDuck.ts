// Copyright 2023 Paion Data. All rights reserved.
import { EditorAction, UPDATE_EDITOR_STATE } from "../types";

const initialState = {};

/**
 * Update editor state
 *
 * The editor State is a JSON equivalent to "Lexical editor State"
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
    case UPDATE_EDITOR_STATE:
      return action.payload;
    default:
      return state;
  }
}
