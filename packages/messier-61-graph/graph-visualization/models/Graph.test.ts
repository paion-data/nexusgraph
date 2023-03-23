// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel, unique } from "./Graph";
import { NodeModel } from "./Node";
import { RelationshipModel } from "./Relationship";

let graph: GraphModel;

beforeEach(() => {
  graph = new GraphModel();
  // expect(graph.nodes).toBe;
  // expect(graph.relationships).toHaveSize(0);
});

test("Add a new graph node using the addOneNode function", () => {
  const addOneNode = constructNodeById("1");

  graph.addNodes([addOneNode]);

  expect(graph.nodes).toStrictEqual([addOneNode]);

  const addOtherNode = constructNodeById("2");

  graph.addNodes([addOtherNode]);

  expect(graph.nodes).toStrictEqual([addOneNode, addOtherNode]);
});

test("existing node does not get added twice", () => {
  const addFirstNode = constructNodeById("1");
  const repeatAddNode = constructNodeById("2");

  graph.addNodes([addFirstNode, repeatAddNode]);

  graph.addNodes([repeatAddNode]);

  expect(graph.nodes).toStrictEqual([addFirstNode, repeatAddNode]);
});

test("Remove a new graph node using the removeNode function", () => {
  const removeNode = constructNodeById("1");

  graph.addNodes([removeNode]);

  graph.removeNode(removeNode);

  expect(graph.nodes).toStrictEqual([]);
});

test("Find contains node using the containsNode function", () => {
  const haveNode = constructNodeById("1");

  graph.addNodes([haveNode]);

  expect(graph.containsNode(haveNode)).toBeTruthy();
});

test("Find a node by node's id", () => {
  const findNodeById = constructNodeById("1");

  graph.addNodes([findNodeById]);

  expect(graph.findNode("1")).toStrictEqual(findNodeById);
});

test("Add a new relationship using the addRelationships function", () => {
  const addOneRelationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([addOneRelationship]);

  expect(graph.relationships).toStrictEqual([addOneRelationship]);
});

test("existing relationship does not get added twice", () => {
  const addOneRelationship = constructRelationshipById("4", "1", "2");

  const repeatAddRelationship = constructRelationshipById("5", "1", "3");

  graph.addRelationships([addOneRelationship, repeatAddRelationship]);

  graph.addRelationships([repeatAddRelationship]);

  expect(graph.relationships).toStrictEqual([addOneRelationship, repeatAddRelationship]);
});

test("Find contains relationship using the containsRelationship function", () => {
  const haveRelationship = constructRelationshipById("4", "1", "2");

  graph.addRelationships([haveRelationship]);

  expect(graph.containsRelationship(haveRelationship.id)).toBeTruthy();
});

test("Find a relationship by relationship's id", () => {
  const findRelationshipById = constructRelationshipById("4", "1", "2");

  graph.addRelationships([findRelationshipById]);

  expect(graph.findRelationship("4")).toStrictEqual(findRelationshipById);
});

test("Find all neighbor ids Of node using the findAllNeighborIdsOfNode function", () => {
  const startNode = constructNodeById("1");

  const neighborNode = constructNodeById("2");

  const relationshipOfNode = constructRelationshipById("4", "1", "2");

  graph.addNodes([startNode, neighborNode]);

  graph.addRelationships([relationshipOfNode]);

  expect(graph.findAllNeighborIdsOfNode(startNode.id)).toStrictEqual([relationshipOfNode.target.id]);
});

test("Find all neighbor ids Of a separate node using the findAllNeighborIdsOfNode function", () => {
  const separateNode = constructNodeById("1");

  graph.addNodes([separateNode]);

  expect(graph.findAllNeighborIdsOfNode(separateNode.id)).toStrictEqual([]);
});

test("Find all relationships to node using the findAllRelationshipsToNode function", () => {
  const starNode = constructNodeById("1");

  const neighborNode1 = constructNodeById("2");

  const neighborNode2 = constructNodeById("3");

  graph.addNodes([starNode, neighborNode1, neighborNode2]);

  const relationshipOfStarNode1 = constructRelationshipById("4", "1", "2");

  const relationshipOfStarNode2 = constructRelationshipById("5", "1", "3");

  graph.addRelationships([relationshipOfStarNode1, relationshipOfStarNode2]);

  expect(graph.findAllRelationshipsToNode(starNode.id)).toStrictEqual([
    relationshipOfStarNode1,
    relationshipOfStarNode2,
  ]);
});

test("A separate node using the findAllRelationshipsToNode function", () => {
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

test("Remove connected relationships", () => {
  const originalNode = constructNodeById("1");

  graph.addNodes([originalNode]);

  const relationshipOnNode = constructRelationshipById("4", "1", "2");

  graph.addRelationships([relationshipOnNode]);

  graph.removeConnectedRelationships(originalNode);

  expect(graph.relationships).toStrictEqual([]);

  expect(graph.relationshipMap[relationshipOnNode.id]).toStrictEqual(undefined);
});

test("Add expand nodes of the node", () => {
  const expandedNode = constructNodeById("1");

  const expandingNode = constructNodeById("2");

  const expandedNodes = [expandedNode];

  graph.addExpandedNodes(expandingNode, expandedNodes);

  expect(graph.expandedNodeIdMap[expandingNode.id]).not.toBe(null);

  expect(graph.expandedNodeIdMap[expandingNode.id]).toStrictEqual([expandedNode.id]);
});

test("[sanity check] collapsing a direct neighbor removes both the neighbor and the relationship", () => {
  const expandingNode = constructNodeById("1");

  const expandedNode = constructNodeById("2");

  const expandedNodes = [expandedNode];

  graph.addExpandedNodes(expandingNode, expandedNodes);

  graph.collapseNode(expandingNode);

  expect(graph.expandedNodeIdMap[expandingNode.id]).toStrictEqual([]);

  expect(graph.nodes).toStrictEqual([]);

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
