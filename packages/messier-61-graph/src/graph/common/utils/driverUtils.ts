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

import {
  isNode,
  isPath,
  isRelationship,
  Node,
  Relationship,
  Path,
  Record
} from 'neo4j-driver-core'
import { DeduplicatedBasicNodesAndRels } from '../types/arcTypes'
import { getPropertyTypeDisplayName, propertyToString } from './cypherTypeUtils'
import { mapObjectValues } from './objectUtils'

export const extractUniqueNodesAndRels = (
  records: Record[],
  {
    nodeLimit,
    keepDanglingRels
  }: { nodeLimit?: number; keepDanglingRels?: boolean } = {}
): DeduplicatedBasicNodesAndRels => {
  let limitHit = false
  if (records.length === 0) {
    return { nodes: [], relationships: [] }
  }

  const items = new Set<unknown>()

  for (const record of records) {
    for (const key of record.keys) {
      items.add(record.get(key))
    }
  }

  const paths: Path[] = []

  const nodeMap = new Map<string, Node>()
  function addNode(n: Node) {
    if (!limitHit) {
      const id = n.identity.toString()
      if (!nodeMap.has(id)) {
        nodeMap.set(id, n)
      }
      if (typeof nodeLimit === 'number' && nodeMap.size === nodeLimit) {
        limitHit = true
      }
    }
  }

  const relMap = new Map<string, Relationship>()
  function addRel(r: Relationship) {
    const id = r.identity.toString()
    if (!relMap.has(id)) {
      relMap.set(id, r)
    }
  }

  const findAllEntities = (item: unknown) => {
    if (typeof item !== 'object' || !item) {
      return
    }

    if (isRelationship(item)) {
      addRel(item)
    } else if (isNode(item)) {
      addNode(item)
    } else if (isPath(item)) {
      paths.push(item)
    } else if (Array.isArray(item)) {
      item.forEach(findAllEntities)
    } else {
      Object.values(item).forEach(findAllEntities)
    }
  }

  findAllEntities(Array.from(items))

  for (const path of paths) {
    if (path.start) {
      addNode(path.start)
    }
    if (path.end) {
      addNode(path.end)
    }
    for (const segment of path.segments) {
      if (segment.start) {
        addNode(segment.start)
      }
      if (segment.end) {
        addNode(segment.end)
      }
      if (segment.relationship) {
        addRel(segment.relationship)
      }
    }
  }

  const nodes = Array.from(nodeMap.values()).map(item => {
    return {
      id: item.identity.toString(),
      labels: item.labels,
      properties: mapObjectValues(item.properties, propertyToString),
      propertyTypes: mapObjectValues(
        item.properties,
        getPropertyTypeDisplayName
      )
    }
  })

  const relationships = Array.from(relMap.values())
    .filter(item => {
      if (keepDanglingRels) {
        return true
      }

      // We'd get dangling relationships from
      // match ()-[a:ACTED_IN]->() return a;
      // or from hitting the node limit
      const start = item.start.toString()
      const end = item.end.toString()
      return nodeMap.has(start) && nodeMap.has(end)
    })
    .map(item => {
      return {
        id: item.identity.toString(),
        startNodeId: item.start.toString(),
        endNodeId: item.end.toString(),
        type: item.type,
        properties: mapObjectValues(item.properties, propertyToString),
        propertyTypes: mapObjectValues(
          item.properties,
          getPropertyTypeDisplayName
        )
      }
    })
  return { nodes, relationships, limitHit }
}
