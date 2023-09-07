// Copyright 2023 Paion Data. All rights reserved.
import { OAuthAction, OAuthState, UPDATE_OAUTH_STATE } from "./oAuthType";

const initialState: OAuthState = {
  accessToken: "initialToken",
  userInfo: { sub : "sub" },
};

export default function oAuthReducer(state = initialState, action: OAuthAction): OAuthState {
  switch (action.type) {
    case UPDATE_OAUTH_STATE:
      return action.payload;
    default:
      return state;
  }
}
