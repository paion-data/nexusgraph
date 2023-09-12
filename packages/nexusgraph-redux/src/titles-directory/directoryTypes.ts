// Copyright 2023 Paion Data. All rights reserved.
export const DIRECTORY_STATE = "directory";
export const UPDATE_DIRECTORY = DIRECTORY_STATE + "/UPDATE_DIRECTORY";

interface Title {
  title: string;
}

export interface DirectoryState extends Array<Title> {}

export interface DirectoryAction {
  type: typeof DIRECTORY_STATE;
  payload: Title[];
}
