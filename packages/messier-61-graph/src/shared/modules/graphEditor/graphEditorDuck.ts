// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "neo4j-arc"
import { GlobalState } from "shared/globalState";

export const NAME = "nodeAndRel"

export const initialState = {
  nodes: [],
  relationships: []
}

export interface GraphEditorAction {
  type: typeof NAME;
  payload: BasicNodesAndRels
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
    case NAME:
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

export const getEditorAction = (graphData: BasicNodesAndRels): GraphEditorAction => {
  return {
    type: NAME,
    payload: graphData
  }
}
