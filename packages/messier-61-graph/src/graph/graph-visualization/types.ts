/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
