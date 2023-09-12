// Copyright 2023 Paion Data. All rights reserved.
import { DirectoryAction, DirectoryState, UPDATE_DIRECTORY } from "./directoryTypes";

const initialState: DirectoryState = [];

/**
 * Used to update the notes title directory
 * 
 * @param state The current {@link DirectoryState}
 * @param action {@link DirectoryAction} for updating a directory
 * 
 * @returns New directory state
 */
export default function directoryReducer(state = initialState, action: DirectoryAction): DirectoryState {
  switch (action.type) {
    case UPDATE_DIRECTORY:
      return action.payload;
    default:
      return state;
  }
}
