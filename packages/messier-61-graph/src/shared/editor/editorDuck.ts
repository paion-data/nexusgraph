// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship } from "../../Graph";
import { GlobalState } from "../globalState";

export const NAME = "graphEditor";
export const UPDATE_GRAPH = "graphEditor/UPDATE_GRAPH";

export const initialState: GraphEditorState = {
  nodes: [{
    id: "2",
    labels: ["label1", "label2"],
    properties: {name: 'Boy', age: '18'},
    propertyTypes: { name: "string", age: "string" }
  }],
  relationships: [{
    id: '3',
    startNodeId: "1",
    endNodeId: "2",
    type: "asd",
    properties: {name: 'Boy', age: '18'},
    propertyTypes: { name: "string", age: "string" }
  }],
};

export interface GraphEditorAction {
  type: typeof UPDATE_GRAPH;
  payload: GraphEditorState;
}

export interface GraphEditorState {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}

export default function editorReducer(state = initialState, action: GraphEditorAction) {
  console.log("editorReducer被调用");

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

export function getEditorNodes(state: GlobalState) {
  console.log(`editorDuck:${state}`);
  
  return state[NAME].nodes;
}

export function getEditorRelationships(state: GlobalState) {
  return state[NAME].relationships;
}

export const getEditorAction = (graphData: GraphEditorState): GraphEditorAction => {
  return {
    type: UPDATE_GRAPH,
    payload: graphData,
  };
};
