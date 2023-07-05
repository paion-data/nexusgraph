import { NodeModel } from "./Node";
import { RelationshipModel } from "./Relationship";

test("Verify relationship serialization contains all relationship properties", () => {
  const testNode = constructNodeById("1");

  const relationship = constructRelationshipById("3", testNode, testNode);

  expect(relationship.toJson()).toStrictEqual({ propKey1: "value1", propkey2: "value2" });
});

test("Relationship is loop", () => {
  const loopNode = constructNodeById("1");

  const loopRelationship = constructRelationshipById("2", loopNode, loopNode);

  expect(loopRelationship.isLoop()).toBeTruthy();
});

test("Relationship is not loop", () => {
  const node = constructNodeById("1");

  const otherNode = constructNodeById("2");

  const unLoopRelationship = constructRelationshipById("3", node, otherNode);

  expect(unLoopRelationship.isLoop()).toBeFalsy();
});

function constructNodeById(id: string): NodeModel {
  return new NodeModel(
    id,
    ["label1", "label2"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
}

function constructRelationshipById(id: string, source: NodeModel, target: NodeModel): RelationshipModel {
  return new RelationshipModel(
    id,
    source,
    target,
    "type1",
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
}
