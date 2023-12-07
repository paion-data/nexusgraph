// Copyright 2023 Paion Data. All rights reserved.

import { mapToBasicNodes, mapToBasicRelationships } from "./mappers";

describe("mappers mapps between Redux representation of nodes/edges and Neo4J arc nodes/rels", () => {
  test("nodes", () => {
    const reduxNodes = [
      {
        id: "foo",
        fields: {
          name: "Jack",
          desc: "A person",
        },
      },
      {
        id: "bar",
        fields: {
          name: "Tom",
          desc: "Yet another person",
        },
      },
    ];

    const expectedBasicNodes = [
      {
        id: "foo",
        elementId: "foo",
        labels: ["*"],
        properties: {
          name: "Jack",
          desc: "A person",
        },
        propertyTypes: {
          name: "string",
          desc: "string",
        },
      },
      {
        id: "bar",
        elementId: "bar",
        labels: ["*"],
        properties: {
          name: "Tom",
          desc: "Yet another person",
        },
        propertyTypes: {
          name: "string",
          desc: "string",
        },
      },
    ];

    expect(mapToBasicNodes(reduxNodes)).toStrictEqual(expectedBasicNodes);
  });

  test("links", () => {
    const reduxLinks = [
      {
        id: "bat",
        source: "node1",
        target: "node2",
        fields: {
          type: "label1",
        },
      },
      {
        id: "baz",
        source: "node3",
        target: "node4",
        fields: {
          type: "label2",
        },
      },
    ];

    const expectedBasicRels = [
      {
        id: "bat",
        elementId: "bat",
        startNodeId: "node1",
        endNodeId: "node2",
        type: "label1",
        properties: {
          type: "label1",
        },
        propertyTypes: {
          type: "string",
        },
      },
      {
        id: "baz",
        elementId: "baz",
        startNodeId: "node3",
        endNodeId: "node4",
        type: "label2",
        properties: {
          type: "label2",
        },
        propertyTypes: {
          type: "string",
        },
      },
    ];

    expect(mapToBasicRelationships(reduxLinks)).toStrictEqual(expectedBasicRels);
  });
});
