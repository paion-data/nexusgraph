// Copyright 2023 Paion Data. All rights reserved.
import { NlpAction, NlpState, UPDATE_NLPDATA } from "../types";

export const initialState: NlpState = {
  nodes: [],
  links: [],
};

/**
 * Update nlp state
 *
 * [Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers) are functions
 * that take the current state and an action as arguments
 *
 * @param state Nlp state
 * @param action Nlp action
 *
 * @returns New nodes and links state
 */
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
