// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const OAUTH_STATE = "oAuth";
const UPDATE_OAUTH_STATE = OAUTH_STATE + "/UPDATE_OAUTH_STATE";

export interface OAuthState {
  accessToken: string;
  userInfo: { sub: string };
}

interface OAuthAction {
  type: typeof OAUTH_STATE;
  payload: OAuthState;
}

const initialState: OAuthState = {
  accessToken: "initialToken",
  userInfo: { sub: "initialUserId" },
};

export function selectOAuth() {
  return useSelector((state: GlobalState) => state.oAuth);
}

export default function oAuthReducer(state = initialState, action: OAuthAction): OAuthState {
  switch (action.type) {
    case UPDATE_OAUTH_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function updateOAuthState(oAuthState: OAuthState) {
  return { type: UPDATE_OAUTH_STATE, payload: oAuthState };
}
