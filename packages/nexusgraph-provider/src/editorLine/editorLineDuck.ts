// Copyright 2023 Paion Data. All rights reserved.
import { EditorAction, UPDATE_LINE } from "../types";

const initialState: string[] = [];
export default function editorReducer(state = initialState, action: EditorAction) {
  switch (action.type) {
    case UPDATE_LINE:
      return action.payload;
    default:
      return state;
  }
}
