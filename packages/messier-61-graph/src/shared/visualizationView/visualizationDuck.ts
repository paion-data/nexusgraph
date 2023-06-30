// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship } from "../../Graph";
import { GlobalState } from "../globalState";

export const NAME = "visualizationData";

export const initialState: VisualizationDataState = {
  allNodes: [
    //   {
    //   id: "E-node",
    //   labels: ["label1", "label2"],
    //   properties: { name: 'E-node', age: '18' },
    //   propertyTypes: { name: "string", age: "string" }
    // }
  ],
  allRelationships: [
    //   {
    //   id: '3',
    //   startNodeId: "E-node",
    //   endNodeId: "2",
    //   type: "asd",
    //   properties: { name: 'E-node', age: '18' },
    //   propertyTypes: { name: "string", age: "string" }
    // }
  ],
};

export interface VisualizationDataAction {
  type: typeof NAME;
  payload: VisualizationDataState;
}

export interface VisualizationDataState {
  allNodes: BasicNode[];
  allRelationships: BasicRelationship[];
}

export default function editorReducer(state = initialState, action: VisualizationDataAction): VisualizationDataState {
  console.log("editorReducer被调用");

  switch (action.type) {
    case NAME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// export function getEditorNodes(state: GlobalState): BasicNode[] {

//   return state[NAME].allNodes;
// }

// export function getEditorRelationships(state: GlobalState): BasicRelationship[] {
//   return state[NAME].allRelationships;
// }

export const getAllDataAction = (graphData: VisualizationDataState): VisualizationDataAction => {
  return {
    type: NAME,
    payload: graphData,
  };
};
