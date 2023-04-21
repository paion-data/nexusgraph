// Copyright 2023 Paion Data. All rights reserved.
import { EditorState } from "lexical"
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "neo4j-arc"

export function getEditorInput(editorState: EditorState): Array<string> {
  const texts: string[] = []
  const children = JSON.parse(JSON.stringify(editorState)).root['children']
  if (children.length > 0) {
    children.map((child: any): any => {
      if (child['children'].length > 0) {
        const text: string = child['children'][child['children'].length - 1]['text']
        texts.push(text)
      }
    })
  }
  return texts
}

export function creatNodesAndRels(texts: Array<string>): BasicNodesAndRels {
  const nodes: BasicNode[] = []
  const relationships: BasicRelationship[] = []
  const nodesAndRels = {
    nodes: nodes,
    relationships: relationships
  }

  let nodeId: string[] = []
  let relstartNodeId: string[] = []
  let relsEndNodeId: string[] = []

  if (texts !== null) {
    texts.map((text) => {
      const words = text.split(' ')
      nodesAndRels.nodes = nodesAndRels.nodes.concat(transformNodesAndRels(words).nodes)
      nodesAndRels.relationships = nodesAndRels.relationships.concat(transformNodesAndRels(words).relationships)
      return nodesAndRels;
    })
  }

  nodesAndRels.nodes = nodesAndRels.nodes.filter((node) => {
    nodeId = nodeId.concat(node.id)
    if (nodeId.indexOf(node.id) === nodeId.lastIndexOf(node.id)) {
      return nodeId.indexOf(node.id) !== -1
    }
    return nodeId.indexOf(node.id) === -1
  })

  nodesAndRels.relationships = nodesAndRels.relationships.filter((rel) => {
    relstartNodeId = relstartNodeId.concat(rel.startNodeId)
    relsEndNodeId = relsEndNodeId.concat(rel.endNodeId)

    if (relstartNodeId.indexOf(rel.startNodeId) === relstartNodeId.lastIndexOf(rel.startNodeId) ||
      relsEndNodeId.indexOf(rel.endNodeId) === relsEndNodeId.lastIndexOf(rel.endNodeId)
    ) {
      return relstartNodeId.indexOf(rel.startNodeId) !== -1 || relsEndNodeId.indexOf(rel.endNodeId) !== -1
    }
    return relstartNodeId.indexOf(rel.startNodeId) === -1 || relsEndNodeId.indexOf(rel.endNodeId) === -1
  })

  return nodesAndRels
}

export function transformNodesAndRels(words: Array<string>): BasicNodesAndRels {
  let nodes: BasicNode[] = []
  let relationships: BasicRelationship[] = []

  if (words.length === 3) {
    const startNode: BasicNode = {
      id: words[0],
      labels: [`${words[0]}`],
      properties: {},
      propertyTypes: {}
    }

    const endNode: BasicNode = {
      id: words[2],
      labels: [`${words[2]}`],
      properties: {},
      propertyTypes: {}
    }

    const relationship: BasicRelationship = {
      id: words[1],
      startNodeId: words[0],
      endNodeId: words[2],
      type: words[1],
      properties: {},
      propertyTypes: {}
    }
    nodes = nodes.concat([startNode, endNode])
    relationships = relationships.concat([relationship])
  }
  return {
    nodes: nodes,
    relationships: relationships
  }
}

export function getEditorNodesAndRels(editorState: EditorState): BasicNodesAndRels {
  return creatNodesAndRels(getEditorInput(editorState))
}
