// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const GRAPH_LIST_STATE = "graphList";
const UPDATE_GRAPH_LIST = GRAPH_LIST_STATE + "/UPDATE_GRAPH_LIST";

export interface GraphMetaData {
  id: string;
  name: string;
}

interface GraphListAction {
  type: typeof GRAPH_LIST_STATE;
  payload: GraphMetaData[];
}

const initialState: GraphMetaData[] = [];

export function selectGraphList() {
  return useSelector((state: GlobalState) => state.graphList);
}

/**
 * Graph list reducer
 *
 * @param state The current {@link GraphMetaData[]}
 * @param action {@link GraphListAction} for updating a directory
 *
 * @returns New directory state
 */
export default function graphListReducer(state = initialState, action: GraphListAction): GraphMetaData[] {
  switch (action.type) {
    case UPDATE_GRAPH_LIST:
      return action.payload;
    default:
      return state;
  }
}

export function updateGraphList(graphListState: GraphMetaData[]) {
  return { type: UPDATE_GRAPH_LIST, payload: graphListState };
}
