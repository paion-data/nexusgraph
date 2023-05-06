// Copyright 2023 Paion Data. All rights reserved.
import { NodeModel } from './models/Node'
import { RelationshipModel } from './models/Relationship'
import { BasicNode, BasicNodesAndRels } from 'neo4j-arc/common'

export type VizItem =
  | NodeItem
  | ContextMenuItem
  | RelationshipItem
  | CanvasItem
  | StatusItem

export type NodeItem = {
  type: 'node'
  item: Pick<NodeModel, 'id' | 'labels' | 'propertyList'>
}

type ContextMenuItem = {
  type: 'context-menu-item'
  item: {
    label: string
    content: string
    selection: string
  }
}

type StatusItem = {
  type: 'status-item'
  item: string
}

export type RelationshipItem = {
  type: 'relationship'
  item: Pick<RelationshipModel, 'id' | 'type' | 'propertyList'>
}

type CanvasItem = {
  type: 'canvas'
  item: {
    nodeCount: number
    relationshipCount: number
  }
}

export type ZoomLimitsReached = {
  zoomInLimitReached: boolean
  zoomOutLimitReached: boolean
}

export enum ZoomType {
  IN = 'in',
  OUT = 'out',
  FIT = 'fit'
}

export type GetNodeNeighboursFn = (
  node: BasicNode | NodeModel,
  currentNeighbourIds: string[],
  callback: (data: BasicNodesAndRels) => void
) => void
