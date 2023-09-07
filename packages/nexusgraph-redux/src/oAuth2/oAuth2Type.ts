// Copyright 2023 Paion Data. All rights reserved.
export const OAUTH2_STATE = "oAuth2";
export const UPDATE_OAUTH2_STATE = OAUTH2_STATE + "/UPDATE_OAUTH2_STATE";

export interface OAuth2State {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  userInfo: Object;
}

export interface OAuth2Action {
  type: typeof OAUTH2_STATE;
  payload: OAuth2State;
}
