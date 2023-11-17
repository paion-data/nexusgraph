// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const GRAPH_LIST_STATE = "graphList";
const UPDATE_GRAPH_LIST = GRAPH_LIST_STATE + "/UPDATE_GRAPH_LIST";
const APPEND_GRAPH_LIST = GRAPH_LIST_STATE + "/APPEND_GRAPH_LIST";
const UPDATE_SINGLE_ITEM = GRAPH_LIST_STATE + "/UPDATE_SINGLE_ITEM";

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
    case APPEND_GRAPH_LIST:
      return [...state, ...action.payload];
    case UPDATE_SINGLE_ITEM:
      state.forEach((item) => {
        if (item.id == action.payload[0].id) {
          item.name = action.payload[0].name;
        }
      });

      return state;
    default:
      return state;
  }
}

export function updateGraphList(graphListState: GraphMetaData[]) {
  return { type: UPDATE_GRAPH_LIST, payload: graphListState };
}

export function appendToGraphList(metadata: GraphMetaData) {
  return { type: APPEND_GRAPH_LIST, payload: [metadata] };
}

export function updateSingleItem(metadata: GraphMetaData) {
  return { type: UPDATE_SINGLE_ITEM, payload: [metadata] };
}
