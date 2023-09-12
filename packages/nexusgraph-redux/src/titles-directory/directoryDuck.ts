// Copyright 2023 Paion Data. All rights reserved.
import { DirectoryAction, DirectoryState, UPDATE_DIRECTORY } from "./directoryTypes";

const initialState: DirectoryState = [];

export default function directoryReducer(state = initialState, action: DirectoryAction): DirectoryState {
  switch (action.type) {
    case UPDATE_DIRECTORY:
      return action.payload;
    default:
      return state;
  }
}
