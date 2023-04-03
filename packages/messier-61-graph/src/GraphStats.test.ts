// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel } from "./models/Graph";
import { NodeModel } from "./models/Node";
import { RelationshipModel } from "./models/Relationship";
import { getGraphStats } from "./GraphStats";

test("Get graph stats of nodes's labels and relationships's types", () => {
  const graph = new GraphModel();
  const nodeLabelMovie = constructNode("1", ["Movie"]);
  const nodeLabelPerson = constructNode("2", ["Person"]);
  const relationshipTypeDireCted = constructRelationship("3", nodeLabelMovie, nodeLabelPerson, "DIRECTED");
  const relationshipTypeDifferent = constructRelationship("4", nodeLabelMovie, nodeLabelPerson, "DIFFERENT");

  graph.addNodes([nodeLabelMovie, nodeLabelPerson]);
  graph.addRelationships([relationshipTypeDireCted, relationshipTypeDifferent]);

  expect(getGraphStats(graph)).toStrictEqual({
    labels: {
      "*": { count: 2, properties: {} },
      Movie: { count: 1, properties: { propKey1: "value1", propkey2: "value2" } },
      Person: { count: 1, properties: { propKey1: "value1", propkey2: "value2" } },
    },
    relTypes: {
      "*": { count: 2, properties: {} },
      DIRECTED: { count: 1, properties: { propKey1: "value1" } },
      DIFFERENT: { count: 1, properties: { propKey1: "value1" } },
    },
  });
});

test("Nodes/relationships of the same type are counted separately", () => {
  const graph = new GraphModel();
  const firstNodeLabelMovie = constructNode("1", ["Movie"]);
  const firstNodeLabelPerson = constructNode("2", ["Person"]);
  const firstRelTypeDireCted = constructRelationship("3", firstNodeLabelMovie, firstNodeLabelPerson, "DIRECTED");

  const secondNodeLabelMovie = constructNode("4", ["Movie"]);
  const secondNodeLabelPerson = constructNode("5", ["Person"]);
  const secondRelTypeDireCted = constructRelationship("6", secondNodeLabelMovie, secondNodeLabelPerson, "DIRECTED");

  graph.addNodes([firstNodeLabelMovie, firstNodeLabelPerson, secondNodeLabelMovie, secondNodeLabelPerson]);
  graph.addRelationships([firstRelTypeDireCted, secondRelTypeDireCted]);

  expect(getGraphStats(graph)).toStrictEqual({
    labels: {
      "*": { count: 4, properties: {} },
      Movie: { count: 2, properties: { propKey1: "value1", propkey2: "value2" } },
      Person: { count: 2, properties: { propKey1: "value1", propkey2: "value2" } },
    },
    relTypes: {
      "*": { count: 2, properties: {} },
      DIRECTED: { count: 2, properties: { propKey1: "value1" } },
    },
  });
});

test("Nodes/relationships on the graph are counted separately when they are null", () => {
  const graph = new GraphModel();
  graph.nodes.length = 0;
  graph.relationships.length = 0;

  expect(getGraphStats(graph)).toStrictEqual({
    labels: {},
    relTypes: {},
  });
});

function constructNode(id: string, labels: string[]): NodeModel {
  return new NodeModel(
    id,
    labels,
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
}

function constructRelationship(id: string, source: NodeModel, target: NodeModel, type: string): RelationshipModel {
  return new RelationshipModel(
    id,
    source,
    target,
    type,
    { propKey1: "value1" },
    { propKey1: "string", propkey2: "string" }
  );
}
