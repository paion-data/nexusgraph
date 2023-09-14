// Copyright 2023 Paion Data. All rights reserved.
import { Link, Node } from "../..";

export const NLP_DATA = "nlpData";
const UPDATE_NLPDATA = NLP_DATA + "/UPDATE_NLPDATA";

export interface NlpState {
  nodes: Node[];
  links: Link[];
}

interface NlpAction {
  type: typeof UPDATE_NLPDATA;
  payload: NlpState;
}

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

export function updateNlpData(nlpState: NlpState) {
  return { type: UPDATE_NLPDATA, payload: nlpState };
}
