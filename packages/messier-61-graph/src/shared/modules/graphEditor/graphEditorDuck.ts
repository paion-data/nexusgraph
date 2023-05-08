// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship } from "neo4j-arc"
import { GlobalState } from "shared/globalState";

export const NAME = "graphEditor"
export const UPDATE_GRAPH_EDITOR_STATE = 'graphEditor/UPDATE_GRAPH_EDITOR_STATE'

export const initialState = {
  nodes: [],
  relationships: []
}

export interface GraphEditorAction {
  type: typeof UPDATE_GRAPH_EDITOR_STATE;
  payload: GraphEditorState
}

export interface GraphEditorState {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}

export default function reducer(
  state = initialState,
  action: GraphEditorAction
) {
  switch (action.type) {
    case UPDATE_GRAPH_EDITOR_STATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export function getEditorNodes(state: GlobalState) {
  return state[NAME].nodes
}

export function getEditorRelationships(state: GlobalState) {
  return state[NAME].relationships
}

export const getEditorAction = (graphData: GraphEditorState): GraphEditorAction => {
  return {
    type: UPDATE_GRAPH_EDITOR_STATE,
    payload: graphData
  }
}
