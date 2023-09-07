// Copyright 2023 Paion Data. All rights reserved.
import { UserInfoResponse } from "@logto/react";

export const OAUTH_STATE = "oAuth";
export const UPDATE_OAUTH_STATE = OAUTH_STATE + "/UPDATE_OAUTH_STATE";

export interface OAuthState {
  accessToken: string;
  userInfo: UserInfoResponse;
}

export interface OAuthAction {
  type: typeof OAUTH_STATE;
  payload: OAuthState;
}
