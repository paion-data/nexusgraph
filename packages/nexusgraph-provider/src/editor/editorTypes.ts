// Copyright 2023 Paion Data. All rights reserved.
export const EDITOR_STATE = "editor";
export const UPDATE_EDITOR_STATE = EDITOR_STATE + "/UPDATE_EDITOR_STATE";

export interface EditorAction {
  type: typeof UPDATE_EDITOR_STATE;
  payload: object;
}
