// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship, GraphEditorAction, GraphEditorState, NAME, UPDATE_GRAPH } from "../../types";
import { GlobalState } from "../globalState";

export const initialState: GraphEditorState = {
  nodes: [],
  relationships: [],
};

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
