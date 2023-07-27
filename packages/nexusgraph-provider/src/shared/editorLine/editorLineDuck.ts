// Copyright 2023 Paion Data. All rights reserved.
import { GlobalState } from "../globalState";

export const NAME = "editorLine";
export const UPDATE_LINE = "editorLine/UPDATE_LINE";

const initialState: string[] = [];
export interface EditorAction {
  type: typeof UPDATE_LINE;
  payload: string[];
}
export default function editorReducer(state = initialState, action: EditorAction) {
  switch (action.type) {
    case UPDATE_LINE:
      return action.payload;
    default:
      return state;
  }
}

export function getEditorLine(state: GlobalState): string[] {
  return state[NAME];
}
