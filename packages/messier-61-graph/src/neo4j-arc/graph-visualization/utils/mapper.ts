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
import { GraphModel } from '../models/Graph'
import { NodeModel } from '../models/Node'
import { RelationshipModel } from '../models/Relationship'
import { BasicNode, BasicRelationship } from 'neo4j-arc/common'
import { optionalToString } from './utils'

const mapProperties = (_: any) => Object.assign({}, ...stringifyValues(_))
const stringifyValues = (obj: any) =>
  Object.keys(obj).map(k => ({
    [k]: obj[k] === null ? 'null' : optionalToString(obj[k])
  }))

export function createGraph(
  nodes: BasicNode[],
  relationships: BasicRelationship[]
): GraphModel {
  const graph = new GraphModel()
  graph.addNodes(mapNodes(nodes))
  graph.addRelationships(mapRelationships(relationships, graph))
  return graph
}

export function mapNodes(nodes: BasicNode[]): NodeModel[] {
  return nodes.map(
    node =>
      new NodeModel(
        node.id,
        node.labels,
        mapProperties(node.properties),
        node.propertyTypes
      )
  )
}

export function mapRelationships(
  relationships: BasicRelationship[],
  graph: GraphModel
): RelationshipModel[] {
  return relationships.map(rel => {
    const source = graph.findNode(rel.startNodeId)
    const target = graph.findNode(rel.endNodeId)
    return new RelationshipModel(
      rel.id,
      source,
      target,
      rel.type,
      mapProperties(rel.properties),
      rel.propertyTypes
    )
  })
}

export type GraphStatsLabels = Record<
  string,
  { count: number; properties: Record<string, string> }
>
export type GraphStatsRelationshipTypes = Record<
  string,
  { count: number; properties: Record<string, string> }
>
export type GraphStats = {
  labels?: GraphStatsLabels
  relTypes?: GraphStatsRelationshipTypes
}

export function getGraphStats(graph: GraphModel): GraphStats {
  const labelStats: GraphStatsLabels = {}
  const relTypeStats: GraphStatsRelationshipTypes = {}
  graph.nodes().forEach(node => {
    node.labels.forEach(label => {
      if (labelStats['*']) {
        labelStats['*'].count = labelStats['*'].count + 1
      } else {
        labelStats['*'] = {
          count: 1,
          properties: {}
        }
      }
      if (labelStats[label]) {
        labelStats[label].count = labelStats[label].count + 1
        labelStats[label].properties = {
          ...labelStats[label].properties,
          ...node.propertyMap
        }
      } else {
        labelStats[label] = {
          count: 1,
          properties: node.propertyMap
        }
      }
    })
  })
  graph.relationships().forEach(rel => {
    if (relTypeStats['*']) {
      relTypeStats['*'].count = relTypeStats['*'].count + 1
    } else {
      relTypeStats['*'] = {
        count: 1,
        properties: {}
      }
    }
    if (relTypeStats[rel.type]) {
      relTypeStats[rel.type].count = relTypeStats[rel.type].count + 1
      relTypeStats[rel.type].properties = {
        ...relTypeStats[rel.type].properties,
        ...rel.propertyMap
      }
    } else {
      relTypeStats[rel.type] = {
        count: 1,
        properties: rel.propertyMap
      }
    }
  })
  return { labels: labelStats, relTypes: relTypeStats }
}
