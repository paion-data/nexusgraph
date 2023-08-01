// Copyright 2023 Paion Data. All rights reserved.
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
