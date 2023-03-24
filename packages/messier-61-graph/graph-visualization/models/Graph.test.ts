// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel, unique } from "./Graph";
import { NodeModel } from "./Node";
import { RelationshipModel } from "./Relationship";

let graph: GraphModel;

beforeEach(() => {
  graph = new GraphModel();
  expect(graph.nodes).toStrictEqual([]);
  expect(graph.relationships).toStrictEqual([]);
});

test("Adding distinct nodes makes them part of the graph nodes", () => {
  const firstNode = constructNodeById("1");

  graph.addNodes([firstNode]);

  expect(graph.nodes).toStrictEqual([firstNode]);

  const secondNode = constructNodeById("2");

  graph.addNodes([secondNode]);

  expect(graph.nodes).toStrictEqual([firstNode, secondNode]);
});

test("existing node does not get added twice", () => {
  const firstNode = constructNodeById("1");
  const secondNode = constructNodeById("2");

  graph.addNodes([firstNode, secondNode]);

  graph.addNodes([secondNode]);

  expect(graph.nodes).toStrictEqual([firstNode, secondNode]);
});

test("Removes a node from the graph nodes", () => {
  const removeNode = constructNodeById("1");

  graph.addNodes([removeNode]);

  graph.removeNode(removeNode);

  expect(graph.nodes).toStrictEqual([]);
});

test("Find contains node from the graph nodes", () => {
  const graphNode = constructNodeById("1");

  graph.addNodes([graphNode]);

  expect(graph.containsNode(graphNode)).toBeTruthy();
});

test("Find a node by node's id", () => {
  const findNodeById = constructNodeById("1");

  graph.addNodes([findNodeById]);

  expect(graph.findNode("1")).toStrictEqual(findNodeById);
});

test("Adding distinct relationships makes them part of the graph relationships", () => {
  const relationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([relationship]);

  expect(graph.relationships).toStrictEqual([relationship]);
});

test("existing relationship does not get added twice", () => {
  const firstRelationship = constructRelationshipById("4", "1", "2");

  const secondRelationship = constructRelationshipById("5", "1", "3");

  graph.addRelationships([firstRelationship, secondRelationship]);

  graph.addRelationships([secondRelationship]);

  expect(graph.relationships).toStrictEqual([firstRelationship, secondRelationship]);
});

test("Find contains relationship from graph relationships", () => {
  const graphRelationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([graphRelationship]);

  expect(graph.containsRelationship(graphRelationship.id)).toBeTruthy();
});

test("Find a relationship by relationship's id", () => {
  const relationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([relationship]);

  expect(graph.findRelationship("4")).toStrictEqual(relationship);
});

test("Find all neighbor ids Of node", () => {
  const masterNode = constructNodeById("1");

  const neighborNode = constructNodeById("2");

  const relationshipOfNode = constructRelationshipById("4", "1", "2");

  graph.addNodes([masterNode, neighborNode]);

  graph.addRelationships([relationshipOfNode]);

  expect(graph.findAllNeighborIdsOfNode(masterNode.id)).toStrictEqual([relationshipOfNode.target.id]);
});

test("Find all neighbor ids Of a separate node", () => {
  const separateNode = constructNodeById("1");

  graph.addNodes([separateNode]);

  expect(graph.findAllNeighborIdsOfNode(separateNode.id)).toStrictEqual([]);
});

test("Find all relationships to node", () => {
  const masterNode = constructNodeById("1");

  const neighborNode1 = constructNodeById("2");

  const neighborNode2 = constructNodeById("3");

  graph.addNodes([masterNode, neighborNode1, neighborNode2]);

  const firstRelationship = constructRelationshipById("4", "1", "2");

  const secondRelationship = constructRelationshipById("5", "1", "3");

  graph.addRelationships([firstRelationship, secondRelationship]);

  expect(graph.findAllRelationshipsToNode(masterNode.id)).toStrictEqual([firstRelationship, secondRelationship]);
});

test("Finds all relationships for a node that has no relationship ", () => {
  const separateNode = constructNodeById("1");

  graph.addNodes([separateNode]);

  expect(graph.findAllRelationshipsToNode(separateNode.id)).toStrictEqual([]);
});

test("findAllRelationshipsToNode on loop", () => {
  const singleNode = constructNodeById("1");
  graph.addNodes([singleNode]);

  const selfPointingLink = new RelationshipModel(
    "4",
    singleNode,
    singleNode,
    "type1",
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
  graph.addRelationships([selfPointingLink]);

  expect(graph.findAllRelationshipsToNode(singleNode.id)).toStrictEqual([selfPointingLink]);
});

test("Remove the relationship on the node", () => {
  const originalNode = constructNodeById("1");

  graph.addNodes([originalNode]);

  const relationshipOnNode = constructRelationshipById("4", "1", "2");

  graph.addRelationships([relationshipOnNode]);

  graph.removeConnectedRelationships(originalNode);

  expect(graph.relationships).toStrictEqual([]);

  expect(graph.relationshipMap[relationshipOnNode.id]).toStrictEqual(undefined);
});

test("Expanded nodes are added as regular graph nodes and mappings for them are also created", () => {
  const expandedNode = constructNodeById("1");

  const expandingNode = constructNodeById("2");

  graph.addExpandedNodes(expandingNode, [expandedNode]);

  const expandingNodeId = expandingNode.id;

  const expectedMap: Record<string, string[]> = {};

  expectedMap[expandingNodeId] = [expandedNode.id];

  expect(graph.expandedNodeIdMap).toStrictEqual(expectedMap);

  expect(graph.nodes).toStrictEqual([expandedNode]);
});

test("[sanity check] collapsing a direct neighbor removes both the neighbor and the relationship", () => {
  const expandingNode = constructNodeById("1");
  graph.addNodes([expandingNode]);

  const expandedNode = constructNodeById("2");
  graph.addExpandedNodes(expandingNode, [expandedNode]);

  expect(graph.nodes).toStrictEqual([expandingNode, expandedNode]);

  graph.collapseNode(expandingNode);

  expect(graph.expandedNodeIdMap).toStrictEqual({});

  expect(graph.nodes).toStrictEqual([expandingNode]);

  expect(graph.relationships).toStrictEqual([]);
});

test("collapsing a direct neighbor removes both the neighbor and the relationship of the recursive node", () => {
  const expandingNode = constructNodeById("1");
  graph.addNodes([expandingNode]);

  const expandedNode = constructNodeById("2");
  graph.addExpandedNodes(expandingNode, [expandedNode]);

  const recursionExpandedNode = constructNodeById("3");
  graph.addExpandedNodes(expandedNode, [recursionExpandedNode]);

  const quadraticRecursionNode = constructNodeById("4");
  graph.addExpandedNodes(recursionExpandedNode, [quadraticRecursionNode]);

  expect(graph.nodes).toStrictEqual([expandingNode, expandedNode, recursionExpandedNode, quadraticRecursionNode]);

  graph.collapseNode(expandingNode);

  expect(graph.expandedNodeIdMap).toStrictEqual({});

  expect(graph.nodes).toStrictEqual([expandingNode]);

  expect(graph.relationships).toStrictEqual([]);
});

test("Reset the graph of everything", () => {
  const originalNode = constructNodeById("1");

  graph.addNodes([originalNode]);

  const originalRelationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([originalRelationship]);

  graph.resetGraph();

  expect(graph.nodes).toStrictEqual([]);

  expect(graph.relationships).toStrictEqual([]);

  expect(graph.nodeMap).toStrictEqual({});

  expect(graph.relationshipMap).toStrictEqual({});

  expect(graph.expandedNodeIdMap).toStrictEqual({});
});

test("String in the array is unique", () => {
  const stringList = ["a", "a", "b"];

  expect(unique(stringList)).toStrictEqual(["a", "b"]);
});

test("Object in the array is unique", () => {
  const repeatNode = constructNodeById("1");
  const uniqueNode = constructNodeById("2");

  expect(unique([repeatNode, repeatNode, uniqueNode])).toStrictEqual([repeatNode, uniqueNode]);
});

function constructNodeById(id: string): NodeModel {
  return new NodeModel(
    id,
    ["label1", "label2"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
}

function constructRelationshipById(id: string, sourceId: string, targetId: string): RelationshipModel {
  return new RelationshipModel(
    id,
    constructNodeById(sourceId),
    constructNodeById(targetId),
    "type1",
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
}
