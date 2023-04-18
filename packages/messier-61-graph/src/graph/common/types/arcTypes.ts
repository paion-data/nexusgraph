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
