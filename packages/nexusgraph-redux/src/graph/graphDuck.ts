// Copyright 2023 Paion Data. All rights reserved.
import { produce } from "immer";
import { useSelector } from "react-redux";
import { GlobalState, Link, Node } from "../..";

export const GRAPH_DATA = "graphData";
const UPDATE_GRAPH_DATA = GRAPH_DATA + "/UPDATE_GRAPH_DATA";

export interface GraphState {
  id?: string;
  name?: string;

  nodes: Node[];
  links: Link[];
}

export const initialState: GraphState = {
  id: undefined,
  name: undefined,

  nodes: [],
  links: [],
};

export type GraphName = Pick<GraphState, "id" | "name">;

interface GraphAction {
  type: typeof UPDATE_GRAPH_DATA;
  payload: GraphState;
}

export function selectGraphData() {
  return useSelector((state: GlobalState) => {
    return state.graphData;
  });
}

export function updateGraphData(graphState: GraphState) {
  return { type: UPDATE_GRAPH_DATA, payload: graphState };
}

/**
 * Update graph state
 *
 * [Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers) are functions
 * that take the current state and an action as arguments
 *
 * @param state Graph state
 * @param action Graph action
 *
 * @returns New nodes and links state
 */
export default function graphReducer(state = initialState, action: GraphAction): GraphState {
  switch (action.type) {
    case UPDATE_GRAPH_DATA:
      return produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        draft.nodes = action.payload.nodes;
        draft.links = action.payload.links;
      });
    default:
      return state;
  }
}
