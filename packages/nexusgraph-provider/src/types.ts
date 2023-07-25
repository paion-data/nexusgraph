//Copyright 2023 Paion Data. All rights reserved.
export const NAME = "graphEditor";
export const UPDATE_GRAPH = "graphEditor/UPDATE_GRAPH";

export interface BasicNode {
  id: string;
  labels: string[];
  properties: Record<string, string>;
  propertyTypes: Record<string, string>;
}
export interface BasicRelationship {
  id: string;
  startNodeId: string;
  endNodeId: string;
  type: string;
  properties: Record<string, string>;
  propertyTypes: Record<string, string>;
}

export interface BasicNodesAndRels {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}

export interface GraphEditorAction {
  type: typeof UPDATE_GRAPH;
  payload: GraphEditorState;
}

export interface GraphEditorState {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}
