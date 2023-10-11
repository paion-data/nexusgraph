// Copyright 2023 Paion Data. All rights reserved.
export type BasicNode = {
  id: string
  labels: string[]
  properties: Record<string, string>
  propertyTypes: Record<string, string>
}
export type BasicRelationship = {
  id: string
  startNodeId: string
  endNodeId: string
  type: string
  properties: Record<string, string>
  propertyTypes: Record<string, string>
}
export type BasicNodesAndRels = {
  nodes: BasicNode[]
  relationships: BasicRelationship[]
}
export type DeduplicatedBasicNodesAndRels = {
  nodes: BasicNode[]
  relationships: BasicRelationship[]
  limitHit?: boolean
}

export type VizItemProperty = { key: string; value: string; type: string }
