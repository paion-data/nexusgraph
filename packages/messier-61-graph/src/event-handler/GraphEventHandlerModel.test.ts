// Copyright 2023 Paion Data. All rights reserved.
import { Visualization } from "../Visualization";
import { GraphModel } from "../models/Graph";
import { NodeModel } from "../models/Node";
import { GraphEventHandlerModel, GraphInteraction } from "./GraphEventHandlerModel";
import { VizItem } from "../VizItem";
import { GraphStats } from "../GraphStats";
import { RelationshipModel } from "../models/Relationship";

jest.mock("../models/Node");
const MockedNodeModel = NodeModel as jest.Mock<NodeModel>;

jest.mock("../models/Graph");
const MockedGraphModel = GraphModel as jest.Mock<GraphModel>;

jest.mock("../Visualization");
const MockedVisualization = Visualization as jest.Mock<Visualization>;

jest.mock("../models/Relationship");
const MockedRelationshipModel = RelationshipModel as jest.Mock<RelationshipModel>;

beforeAll(() => {
  Object.defineProperty(MockedGraphModel.prototype, "nodes", {
    get() {
      return [];
    },
  });
  Object.defineProperty(MockedGraphModel.prototype, "relationships", {
    get() {
      return [];
    },
  });
});

beforeEach(() => {
  MockedNodeModel.mockClear();
  MockedGraphModel.mockClear();
  MockedVisualization.mockClear();
  MockedRelationshipModel.mockClear();
});

describe("Selecting the node/relationship will updata visualization", () => {
  test("Selecting the node set its radii", () => {
    const testModel = initHandlerModel();

    testModel.selectedItem = null;

    testModel.selectItem(new MockedNodeModel());

    expect(testModel.visualization.update).toHaveBeenCalledTimes(1);
  });

  test("Selected the relationship format the relationship captions", () => {
    const testModel = initHandlerModel();

    testModel.selectedItem = null;

    testModel.selectItem(new MockedRelationshipModel());

    expect(testModel.visualization.update).toHaveBeenCalledTimes(1);
  });
});

describe("Deselecting the node/relationship", () => {
  test("Deselecting a node collapses the menu", () => {
    const testModel = initHandlerModel();

    testModel.selectedItem = new MockedNodeModel();

    const onItemSelectedMethod = jest.spyOn(testModel, "onItemSelected");

    testModel.deselectItem();

    expect(testModel.visualization.update).toHaveBeenCalledTimes(1);

    expect(onItemSelectedMethod).toHaveBeenCalledTimes(1);
  });

  test("Deselect a relationship sets the canvas item", () => {
    const testModel = initHandlerModel();

    testModel.selectedItem = new MockedRelationshipModel();

    const onItemSelectedMethod = jest.spyOn(testModel, "onItemSelected");

    testModel.deselectItem();

    expect(testModel.visualization.update).toHaveBeenCalledTimes(1);

    expect(onItemSelectedMethod).toHaveBeenCalledTimes(1);
  });
});

test("'Closing' node deletes the sub-graph reachable from the specified node", () => {
  const testModel = initHandlerModel();

  testModel.selectedItem = null;
  testModel.nodeClose(new MockedNodeModel());

  expect(testModel.visualization.update).toHaveBeenCalledTimes(1);
  expect(testModel.graph.removeConnectedRelationships).toHaveBeenCalledTimes(1);
  expect(testModel.graph.removeNode).toHaveBeenCalledTimes(1);
});

test("Clicking on a node relocates its coordinates ", () => {
  const testModel = initHandlerModel();
  const realNode = new NodeModel(
    "1",
    ["label"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );

  new MockedNodeModel().selected = false;
  const selectItemMethod = jest.spyOn(testModel, "selectItem");
  const onItemSelectedMethod = jest.spyOn(testModel, "onItemSelected");

  testModel.nodeClicked(realNode);

  expect(testModel.visualization.update).toHaveBeenCalledTimes(1);

  expect(selectItemMethod).toBeCalled();
  expect(onItemSelectedMethod).toBeCalled();
  expect(realNode.hoverFixed).toBeFalsy();
  expect(realNode.fx).toStrictEqual(realNode.x);
  expect(realNode.fy).toStrictEqual(realNode.y);
});

test("Unlocking a node will be deselected", () => {
  const testModel = initHandlerModel();

  const realNode = new NodeModel(
    "1",
    ["label"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );

  const deselectItemMethod = jest.spyOn(testModel, "deselectItem");
  const onGraphInteractionMethod = jest.spyOn(testModel, "onGraphInteraction");

  testModel.nodeUnlock(realNode);

  expect(deselectItemMethod).toBeCalled();
  expect(onGraphInteractionMethod).toBeCalled();

  expect(realNode.fx).toBeNull();
  expect(realNode.fy).toBeNull();
});

describe("Double-clicking a node expands or collapses its neighbors", () => {
  test("Double-click the node when it expands will collapse the node", () => {
    const testModel = initHandlerModel();

    const nodeCollapseMethod = jest.spyOn(testModel, "nodeCollapse");

    const mockedNode = new MockedNodeModel();
    mockedNode.expanded = true;

    testModel.nodeDblClicked(mockedNode);

    expect(nodeCollapseMethod).toBeCalled();
  });

  test("Double-click the node when it collapses will acquire neighbor nodes", () => {
    const testModel = initHandlerModel();

    const mockedNode = new MockedNodeModel();
    mockedNode.expanded = false;

    const nodeCollapseMethod = jest.spyOn(testModel, "nodeCollapse");
    const getNodeNeighboursMethod = jest.spyOn(testModel, "getNodeNeighbours");
    const onGraphInteractionMethod = jest.spyOn(testModel, "onGraphInteraction");

    testModel.nodeDblClicked(mockedNode);

    expect(nodeCollapseMethod).not.toBeCalled();
    expect(getNodeNeighboursMethod).toHaveBeenCalledTimes(1);
    expect(onGraphInteractionMethod).toHaveBeenCalledTimes(1);
  });
});

test("Collapses all neighbour nodes of a expanding node", () => {
  const testModel = initHandlerModel();

  const graphModelChangedMethod = jest.spyOn(testModel, "graphModelChanged");
  testModel.nodeCollapse(new MockedNodeModel());

  expect(graphModelChangedMethod).toHaveBeenCalledTimes(1);
  expect(testModel.visualization.update).toHaveBeenCalledTimes(1);
  expect(testModel.graph.collapseNode).toHaveBeenCalledTimes(1);
});

test("Moving the mouse over a node sets the hovered item", () => {
  const testModel = initHandlerModel();

  const mockedNode = new MockedNodeModel();
  mockedNode.contextMenu = undefined;

  const onItemMouseOverMethod = jest.spyOn(testModel, "onItemMouseOver");

  testModel.onNodeMouseOver(mockedNode);

  expect(onItemMouseOverMethod).toHaveBeenCalledTimes(1);
});

describe("Moving the mouse over a menu", () => {
  test("Moving the mouse over a menu sets the hovered item", () => {
    const testModel = initHandlerModel();

    const mockedNode = new MockedNodeModel();
    mockedNode.contextMenu = { menuSelection: "string", menuContent: "string", label: "string" };

    const onItemMouseOverMethod = jest.spyOn(testModel, "onItemMouseOver");

    testModel.onMenuMouseOver(mockedNode);

    expect(onItemMouseOverMethod).toHaveBeenCalledTimes(1);
  });

  test("The context Menu undefined", () => {
    const testModel = initHandlerModel();

    const mockedNode = new MockedNodeModel();
    mockedNode.contextMenu = undefined;

    function testError() {
      testModel.onMenuMouseOver(mockedNode);
    }

    expect(testError).toThrow(new Error("menuMouseOver triggered without menu"));
  });
});

test("Moving the mouse over a relationship sets the hovered item", () => {
  const testModel = initHandlerModel();

  const onItemMouseOverMethod = jest.spyOn(testModel, "onItemMouseOver");

  testModel.onRelationshipMouseOver(new MockedRelationshipModel());

  expect(onItemMouseOverMethod).toHaveBeenCalledTimes(1);
});

describe("Clicking on a relationship will select or deselect it", () => {
  test("Clicking on a selected relationship will deselect it", () => {
    const testModel = initHandlerModel();

    const mockedRelationship = new MockedRelationshipModel();
    mockedRelationship.selected = false;

    const selectItemMethod = jest.spyOn(testModel, "selectItem");
    const onItemSelectedMethod = jest.spyOn(testModel, "onItemSelected");

    testModel.onRelationshipClicked(mockedRelationship);

    expect(selectItemMethod).toHaveBeenCalledTimes(1);
    expect(onItemSelectedMethod).toHaveBeenCalledTimes(1);
  });

  test("Clicking on a relationship that is not selected will select it", () => {
    const testModel = initHandlerModel();

    const mockedRelationship = new MockedRelationshipModel();
    mockedRelationship.selected = true;

    const deselectItemMethod = jest.spyOn(testModel, "deselectItem");

    testModel.onRelationshipClicked(mockedRelationship);

    expect(deselectItemMethod).toHaveBeenCalledTimes(1);
  });
});

test("Clicking on the canvas clears all selections", () => {
  const testModel = initHandlerModel();

  const deselectItemMethod = jest.spyOn(testModel, "deselectItem");

  testModel.onCanvasClicked();

  expect(deselectItemMethod).toHaveBeenCalledTimes(1);
});

test("Moving the mouse out the VizTiem(a node ,a relationship or a menu) sets the canvas item ", () => {
  const testModel = initHandlerModel();

  const onItemMouseOverMethod = jest.spyOn(testModel, "onItemMouseOver");

  testModel.onItemMouseOut();

  expect(onItemMouseOverMethod).toHaveBeenCalledTimes(1);
});

test("Bind event handlers to callback", () => {
  const testModel = initHandlerModel();

  const mockedVisualization = testModel.visualization;

  const mockedOn = mockedVisualization.on as jest.MockedFunction<typeof mockedVisualization.on>;
  mockedOn.mockReturnValue(mockedVisualization);

  testModel.bindEventHandlers();

  expect(testModel.visualization.on).toHaveBeenCalledTimes(12);
});

function initHandlerModel() {
  return new GraphEventHandlerModel(
    new MockedGraphModel(),
    new MockedVisualization(),
    () => undefined,
    (item: VizItem) => undefined,
    (item: VizItem) => undefined,
    (stats: GraphStats) => undefined,
    (event: GraphInteraction) => undefined
  );
}
