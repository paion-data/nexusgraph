// Copyright 2023 Paion Data. All rights reserved.
import { addEditorNodeAndRel } from "browser/modules/Sidebar/AddEditorNodesAndRels";
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "neo4j-arc"
import { GlobalState } from "shared/globalState";

export const NAME = "nodeAndRel"

const initialState = {
  nodes: [],
  relationship: []
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
      // console.log(`graphReducer被调用`)
      return {
        ...state,
        ...action.payload
      }
      default:
        return state
  }
}

export function getEditorNodes(state: GlobalState) {
  // console.log(`getEditorNodes被调用=${state[NAME].nodes}`)
  // console.log(state[NAME])
  return state[NAME].nodes
}

export function getEditorRelationships(state: GlobalState) {
  return state[NAME].relationships
}

export function getEditorAll(state: GlobalState) {
  return state[NAME]
}

export const addNodesAndRels = (graphData: BasicNodesAndRels): GraphEditorAction => {
  // console.log(`updateNodesAndRels被调用`)
  return {
    type: NAME,
    payload: graphData
  }
}
