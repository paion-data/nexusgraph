// Copyright 2023 Paion Data. All rights reserved.
import reducer, { getEditorAction, getEditorNodes, getEditorRelationships, GraphEditorAction, initialState, NAME, UPDATE_GRAPH } from "./graphEditorDuck"
import { NAME as editor, GraphEditorState } from '../graphEditor/graphEditorDuck'

const EDITOR_STATE: GraphEditorState = {
  nodes: [
    {
      id: "i",
      labels: ["i"],
      properties: {},
      propertyTypes: {}
    },
    {
      id: "dog",
      labels: ["dog"],
      properties: {},
      propertyTypes: {}
    },
  ],
  relationships: [
    {
      id: "like",
      startNodeId: "i",
      endNodeId: "dog",
      type: 'like',
      properties: {},
      propertyTypes: {}
    }
  ]
}

const EDITOR_ACTION: GraphEditorAction = {
  type: UPDATE_GRAPH,
  payload: EDITOR_STATE
}

const globalState: { [key: string]: any } = {}

globalState[editor] = EDITOR_STATE

test("Gets nodes according to the editor's state", () => {
  expect(getEditorNodes(globalState as any)).toStrictEqual(EDITOR_STATE.nodes)
})

test("Gets relationships according to the editor's state", () => {
  expect(getEditorRelationships(globalState as any)).toStrictEqual(EDITOR_STATE.relationships)
})

test("Gets the action for editor", () => {
  expect(getEditorAction(EDITOR_STATE)).toStrictEqual(
    {
      type: UPDATE_GRAPH,
      payload: EDITOR_STATE
    })
})

test("When an action occurs on the editor, the state of the editor changes based on the action", () => {
  expect(reducer(initialState, EDITOR_ACTION)).toStrictEqual(EDITOR_STATE)
})
