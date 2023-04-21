// Copyright 2023 Paion Data. All rights reserved.
import { creatNodesAndRels, getEditorInput, getEditorNodesAndRels, transformNodesAndRels } from "./AddEditorNodesAndRels"

const TEST_EDITOR_STATE_JSON = {
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "i like dog",
            "type": "text",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}

test("Gets the text entered in editor", () => {
  expect(getEditorInput(TEST_EDITOR_STATE_JSON as any)).toStrictEqual(["i like dog"])
})

test("Convert all the text entered in the editor to nodes and relationships in the graph", () => {
  const editorTexts = ["i like dog", "i love cat"]
  const nodesAndRels = {
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
      {
        id: "cat",
        labels: ["cat"],
        properties: {},
        propertyTypes: {}
      }
    ],
    relationships: [
      {
        id: "like",
        startNodeId: "i",
        endNodeId: "dog",
        type: '',
        properties: {},
        propertyTypes: {}
      },
      {
        id: "love",
        startNodeId: "i",
        endNodeId: "cat",
        type: '',
        properties: {},
        propertyTypes: {}
      }
    ]
  }
  expect(creatNodesAndRels(editorTexts)).toStrictEqual(nodesAndRels)
})

test("Converts a line of words entered in the editor to nodes and relationships needed for the graph", () => {
  const editorWords = ["i", "like", "dog"]
  const nodesAndRels = {
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
        type: '',
        properties: {},
        propertyTypes: {}
      }
    ]
  }
  expect(transformNodesAndRels(editorWords)).toStrictEqual(nodesAndRels)
})

test("Entering text in the editor gets the nodes and relationships", () => {
  const nodesAndRels = {
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
        type: '',
        properties: {},
        propertyTypes: {}
      }
    ]
  }
  expect(getEditorNodesAndRels(TEST_EDITOR_STATE_JSON as any)).toStrictEqual(nodesAndRels)
})
