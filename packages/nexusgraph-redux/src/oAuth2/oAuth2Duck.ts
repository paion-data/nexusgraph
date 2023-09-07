// Copyright 2023 Paion Data. All rights reserved.
import { OAuth2Action, OAuth2State, UPDATE_OAUTH2_STATE } from "./oAuth2Type";

const initialState: OAuth2State = {
  isLoading: false,
  isAuthenticated: false,
  accessToken: "initialState token",
  userInfo: {},
};

export default function oAuth2Reducer(state = initialState, action: OAuth2Action): OAuth2State {
  switch (action.type) {
    case UPDATE_OAUTH2_STATE:
      return action.payload;
    default:
      return state;
  }
}
