// Copyright 2023 Paion Data. All rights reserved.
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GlobalState, Link, Node } from "../..";

export const INITIAL_GRAPH_NAME = "Unamed Graph";

export const GRAPH_DATA = "graphData";
const UPDATE_GRAPH_DATA = GRAPH_DATA + "/UPDATE_GRAPH_DATA";

export interface GraphState {
  id?: string;

  nodes: Node[];
  links: Link[];

  name: string;
}

export const initialState: GraphState = {
  id: undefined,

  nodes: [],
  links: [],

  name: INITIAL_GRAPH_NAME,
};

export type GraphName = Pick<GraphState, "id" | "name">;

interface GraphAction {
  type: typeof UPDATE_GRAPH_DATA;
  payload: GraphState;
}

function shouldDisplayInitialGraphName(name: string): boolean {
  return name == initialState.name;
}

export function selectGraphData() {
  const { t } = useTranslation();

  const initialGraphName = t("Unamed Graph");

  return useSelector((state: GlobalState) => {
    if (shouldDisplayInitialGraphName(state.graphData.name)) {
      state.graphData.name = initialGraphName;
      return state.graphData;
    }
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
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
