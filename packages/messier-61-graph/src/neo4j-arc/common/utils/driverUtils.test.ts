// Copyright 2023 Paion Data. All rights reserved.

import { Node, Path, PathSegment, Relationship } from 'neo4j-driver-core'
import { extractUniqueNodesAndRels } from './driverUtils'

describe('extractNodesAndRels', () => {
  test('should map bolt records with a path to nodes and relationships', () => {
    const startNode = new Node(1, ['Person'], {
      prop1: 'prop1'
    })
    const endNode = new Node(2, ['Movie'], {
      prop2: 'prop2'
    })
    const relationship = new Relationship(
      3,
      startNode.identity,
      endNode.identity,
      'ACTED_IN',
      {}
    )
    const pathSegment = new PathSegment(startNode, relationship, endNode)
    const path = new Path(startNode, endNode, [pathSegment])
    const boltRecord: any = {
      keys: ['p'],
      get: () => path
    }

    const { nodes, relationships } = extractUniqueNodesAndRels([boltRecord])
    expect(nodes.length).toBe(2)
    const graphNodeStart = nodes.filter(node => node.id === '1')[0]
    expect(graphNodeStart).toBeDefined()
    expect(graphNodeStart.labels).toEqual(['Person'])
    expect(graphNodeStart.properties).toEqual({ prop1: '"prop1"' })
    const graphNodeEnd = nodes.filter(node => node.id === '2')[0]
    expect(graphNodeEnd).toBeDefined()
    expect(graphNodeEnd.labels).toEqual(['Movie'])
    expect(graphNodeEnd.properties).toEqual({ prop2: '"prop2"' })
    expect(relationships.length).toBe(1)
    expect(relationships[0].id).toEqual('3')
    expect(relationships[0].startNodeId).toEqual('1')
    expect(relationships[0].endNodeId).toEqual('2')
    expect(relationships[0].type).toEqual('ACTED_IN')
    expect(relationships[0].properties).toEqual({})
  })

  test('should deduplicate bolt records based on node id and filter out dangling relationships', () => {
    const node1 = new Node(1, ['Person'], {
      prop1: 'prop1'
    })
    const node2 = new Node(1, ['Person'], {
      prop1: 'prop1'
    })
    const relationship = new Relationship(2, node1.identity, 34, 'ACTED_IN', {})

    const boltRecord: any = {
      keys: ['n'],
      get: () => [node1, node2, relationship]
    }

    const { nodes, relationships, limitHit } = extractUniqueNodesAndRels([
      boltRecord
    ])
    expect(limitHit).toBe(false)
    expect(nodes.length).toBe(1)
    expect(relationships.length).toBe(0)
  })

  test('should respect the max nodes limit and filter out dangling relations', () => {
    const startNode = new Node(1, ['Person'], {
      prop1: 'prop1'
    })
    const endNode = new Node(2, ['Movie'], {
      prop2: 'prop2'
    })
    const relationship = new Relationship(
      3,
      startNode.identity,
      endNode.identity,
      'ACTED_IN',
      {}
    )
    const pathSegment = new PathSegment(startNode, relationship, endNode)
    const path = new Path(startNode, endNode, [pathSegment])
    const boltRecord: any = {
      keys: ['p'],
      get: () => path
    }

    const { nodes, relationships, limitHit } = extractUniqueNodesAndRels(
      [boltRecord],
      { nodeLimit: 1 }
    )
    expect(limitHit).toBe(true)
    expect(nodes.length).toBe(1)
    const graphNodeStart = nodes[0]
    expect(graphNodeStart).toBeDefined()
    expect(graphNodeStart.labels).toEqual(['Person'])
    expect(graphNodeStart.properties).toEqual({ prop1: '"prop1"' })
    expect(relationships.length).toBe(0)
  })

  test('should respect the max nodes limit and filter out dangling relations unless asked to keep them', () => {
    const startNode = new Node(1, ['Person'], {
      prop1: 'prop1'
    })
    const endNode = new Node(2, ['Movie'], {
      prop2: 'prop2'
    })
    const relationship = new Relationship(
      3,
      startNode.identity,
      endNode.identity,
      'ACTED_IN',
      {}
    )
    const pathSegment = new PathSegment(startNode, relationship, endNode)
    const path = new Path(startNode, endNode, [pathSegment])
    const boltRecord: any = {
      keys: ['p'],
      get: () => path
    }

    const { nodes, relationships, limitHit } = extractUniqueNodesAndRels(
      [boltRecord],
      { nodeLimit: 1, keepDanglingRels: true }
    )
    expect(limitHit).toBe(true)
    expect(nodes.length).toBe(1)
    const graphNodeStart = nodes[0]
    expect(graphNodeStart).toBeDefined()
    expect(graphNodeStart.labels).toEqual(['Person'])
    expect(graphNodeStart.properties).toEqual({ prop1: '"prop1"' })
    expect(relationships.length).toBe(1)
  })
})
