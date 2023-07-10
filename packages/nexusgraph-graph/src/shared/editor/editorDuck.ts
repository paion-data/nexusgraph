// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship } from "../../Graph";
import { GlobalState } from "../globalState";

export const NAME = "graphEditor";
export const UPDATE_GRAPH = "graphEditor/UPDATE_GRAPH";
export const initialState: GraphEditorState = {
  nodes: [],
  relationships: [],
};

export interface GraphEditorAction {
  type: typeof UPDATE_GRAPH;
  payload: GraphEditorState;
}

export interface GraphEditorState {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}

export default function editorReducer(state = initialState, action: GraphEditorAction): GraphEditorState {
  switch (action.type) {
    case UPDATE_GRAPH:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export function getEditorNodes(state: GlobalState): BasicNode[] {
  return state[NAME].nodes;
}

export function getEditorRelationships(state: GlobalState): BasicRelationship[] {
  return state[NAME].relationships;
}

export const getEditorAction = (graphData: GraphEditorState): GraphEditorAction => {
  return {
    type: UPDATE_GRAPH,
    payload: graphData,
  };
};
