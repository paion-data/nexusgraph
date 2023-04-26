// Copyright 2023 Paion Data. All rights reserved.
import { EditorState } from "lexical"
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "neo4j-arc"

export function addEditorNodeAndRel(editorState: EditorState): BasicNodesAndRels{
  let nodes: BasicNode[] = []
  let relationships :BasicRelationship[] = []

  const children = JSON.parse(JSON.stringify(editorState)).root['children']

  if (children.length > 0) {
    children.map((child: any): any => {
      if (child['children'].length > 0) {
        const text = child['children'][child['children'].length - 1]['text']
        if (text !== null) {
          const nodeAndRel = text.split(' ')

          if (nodeAndRel.length === 3) {
            const startNode: BasicNode = {
              id: nodeAndRel[0],
              labels: [`${nodeAndRel[0]}`],
              properties: {},
              propertyTypes: {}
            }

            const endNode: BasicNode = {
              id: nodeAndRel[2],
              labels: [`${nodeAndRel[2]}`],
              properties: {},
              propertyTypes: {}
            }

            const relationship: BasicRelationship = {
              id: nodeAndRel[1],
              startNodeId: nodeAndRel[0],
              endNodeId: nodeAndRel[2],
              type: '',
              properties: {},
              propertyTypes: {}
            }
            nodes = nodes.concat([startNode, endNode])
            relationships = relationships.concat([relationship])
            // console.log(startNode, 'start')
            // console.log(endNode, 'endnode')
            // console.log(relationship, 'relationship')
          }
        }
      }
    })
  }
  return {
    nodes: nodes,
    relationships: relationships
  }
}
