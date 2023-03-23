// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel, unique } from './Graph';
import { NodeModel } from './Node';
import { RelationshipModel } from './Relationship';

let graph: GraphModel;

beforeEach(() => {
  graph = new GraphModel();
})

test("test addNode", () => {

    const addOneNode = constructNodeById("1")

    graph.addNodes([addOneNode])

    expect(graph.nodes).toStrictEqual([addOneNode])

    const addOtherNode = constructNodeById("2")

    graph.addNodes([addOtherNode])

    expect(graph.nodes).toStrictEqual([addOneNode, addOtherNode])
  });

test("existing node does not get added twice", () => {
    const addFirstNode = constructNodeById("1");
    const repeatAddNode = constructNodeById("2")

    graph.addNodes([addFirstNode, repeatAddNode])

    graph.addNodes([repeatAddNode])

    expect(graph.nodes).toStrictEqual([addFirstNode, repeatAddNode])
});

test("test removeNode", () => {
    const removeNode = constructNodeById("1");

    graph.addNodes([removeNode])

    graph.removeNode(removeNode)

    expect(graph.nodes).toStrictEqual([])
});

test("test containsNode", () => {

    const haveNode = constructNodeById("1");

    graph.addNodes([haveNode])

    expect(graph.containsNode(haveNode)).not.toBe(null)

  });

test("test findNode", () => {

    const findNodeById = constructNodeById("1");

    graph.addNodes([findNodeById])

    expect(graph.findNode("1")).toStrictEqual(findNodeById)

});

test("test addRelationships", () => {

    const addOneRelationship = constructRelationshipById("4", "1", "2")

    graph.addRelationships([addOneRelationship])

    expect(graph.relationships).toStrictEqual([addOneRelationship])

});

test("existing relationship does not get added twice", () => {
    const addOneRelationship = constructRelationshipById("4", "1", "2")

    const repeatAddRelationship = constructRelationshipById("5", "1", "3")

    graph.addRelationships([addOneRelationship, repeatAddRelationship])

    graph.addRelationships([repeatAddRelationship])

    expect(graph.relationships).toStrictEqual([addOneRelationship, repeatAddRelationship])

});

test("test containsRelationship", () => {

    const haveRelationship = constructRelationshipById("4", "1", "2")

    graph.addRelationships([haveRelationship])

    expect(graph.containsRelationship(haveRelationship.id)).not.toBe(null)

});

test("test findRelationship", () => {
    const findRelationshipById = constructRelationshipById("4", "1", "2")

    graph.addRelationships([findRelationshipById])

    expect(graph.findRelationship("4")).toStrictEqual(findRelationshipById)
});

test("test findAllNeighborIdsOfNode", () => {

    const startNode = constructNodeById("1");

    const neighborNode = constructNodeById("2")

    const relationshipOfNode = constructRelationshipById("4", "1", "2")

    graph.addNodes([startNode, neighborNode])

    graph.addRelationships([relationshipOfNode])

    expect(graph.findAllNeighborIdsOfNode(startNode.id)).toStrictEqual([relationshipOfNode.target.id])

});

test("test findAllRelationshipsToNode", () => {
    const starNode = constructNodeById("1");

    const neighborNode1 = constructNodeById("2");

    const neighborNode2 = constructNodeById("3");

    graph.addNodes([starNode, neighborNode1, neighborNode2])

    const relationshipOfStarNode1 = constructRelationshipById("4", "1", "2")

    const relationshipOfStarNode2 = constructRelationshipById("5", "1", "3")

    graph.addRelationships([relationshipOfStarNode1, relationshipOfStarNode2])

    expect(graph.findAllRelationshipsToNode(starNode.id)).toStrictEqual([relationshipOfStarNode1, relationshipOfStarNode2])

});

test("test findAllRelationshipsToNode on loop", () => {
    const singleNode = constructNodeById("1");
    graph.addNodes([singleNode])

    const selfPointingLink = new RelationshipModel("4", singleNode, singleNode, "type1", { "propKey1": "value1", "propkey2": "value2" }, { "propKey1": "string", "propkey2": "string" });
    graph.addRelationships([selfPointingLink])

    expect(graph.findAllRelationshipsToNode(singleNode.id)).toStrictEqual([selfPointingLink])
});

test("test removeConnectedRelationships", () => {

    const originalNode = constructNodeById("1");

    graph.addNodes([originalNode])

    const relationshipOnNode = constructRelationshipById("4", "1", "2")

    graph.addRelationships([relationshipOnNode])
    
    graph.removeConnectedRelationships(originalNode)    

    expect(graph.relationships).toStrictEqual([])

    expect(graph.relationshipMap[relationshipOnNode.id]).toStrictEqual(undefined)

});

test("test addExpandedNodes", () => {

    const originalExpandedNode = constructNodeById("1");

    const newExpandedNode = constructNodeById("2");

    const expandedNodes = [originalExpandedNode]

    graph.addExpandedNodes(newExpandedNode, expandedNodes)

    expect(expandedNodes).toStrictEqual([originalExpandedNode, newExpandedNode])

});

test("test collapseNode", () => {
    const originalExpandedNode = constructNodeById("1");

    const expandedNodes = [originalExpandedNode]

    graph.addExpandedNodes(originalExpandedNode, expandedNodes)

    graph.collapseNode(originalExpandedNode)

    graph.expandedNodeIdMap[originalExpandedNode.id]

    // expect().toStrictEqual([])

});

test("test resetGraph", () => {
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

// test("test unique", () => {

//     const stringList = ["a", "a", "b"]

//     expect(unique(stringList)).toStrictEqual(["a", "b"])

//     const nodeList = [constructNodeById("1"), constructNodeById("1"),constructNodeById("2")]

//     expect(unique(nodeList)).toStrictEqual([constructNodeById("1"), constructNodeById("2")])

// });

function constructNodeById(id: string): NodeModel {
  return new NodeModel(id, ["label1", "label2"], { "propKey1": "value1", "propkey2": "value2" }, { "propKey1": "string", "propkey2": "string" });
}

function constructRelationshipById(id: string, sourceId: string, targetId: string) {
    return new RelationshipModel(id, constructNodeById(sourceId), constructNodeById(targetId), "type1", { "propKey1": "value1", "propkey2": "value2" }, { "propKey1": "string", "propkey2": "string" });
  }
