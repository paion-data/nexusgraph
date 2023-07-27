// Copyright 2023 Paion Data. All rights reserved.
import { NlpAction, NlpState, UPDATE_NLPDATA } from "../types";

export const initialState: NlpState = {
  nodes: [],
  links: [],
};

export default function nlpReducer(state = initialState, action: NlpAction): NlpState {
  switch (action.type) {
    case UPDATE_NLPDATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
