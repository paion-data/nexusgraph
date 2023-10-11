// Copyright 2023 Paion Data. All rights reserved.
import { ForceSimulation } from "./ForceSimulation";
import { NodeModel } from "./models/Node";

const CLOSE_TO_ZERO: number = 0 + 0.00000000000001;
const CLOSE_TO_SQUARE_ROOT_TWO: number = Math.sqrt(2) / 2 + 0.000000000234;
const CLOSE_TO_SQUARE_ROOT_THREE: number = Math.sqrt(3) / 2 + 0.000000000234;
const CENTER = {
  x: 0,
  y: 0,
};
const RADIUS = 10;

let forceSimulation: ForceSimulation;

beforeEach(() => {
  forceSimulation = new ForceSimulation(() => {});
});

test("Gets the radius of a ring with five nodes uniformly distributed", () => {
  const LINK_DISTANCE = 45;

  expect(forceSimulation.getRadius(5)).toBe((5 * LINK_DISTANCE) / (Math.PI * 2));
});

test("When there are four nodes uniformly distributed on the ring, the coordinates of each node are obtained", () => {
  const nodePositiveAxisX = constructNodeById("1");
  const nodePositiveAxisY = constructNodeById("2");
  const nodeNegativeAxisX = constructNodeById("3");
  const nodeNegativeAxisY = constructNodeById("4");

  forceSimulation.circularLayout(
    [nodePositiveAxisX, nodePositiveAxisY, nodeNegativeAxisX, nodeNegativeAxisY],
    CENTER,
    RADIUS
  );

  expect(nodePositiveAxisX.x).toBe(10);
  expect(nodePositiveAxisX.y).toBe(0);

  expect(nodePositiveAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodePositiveAxisY.y).toBe(10);

  expect(nodeNegativeAxisX.x).toBe(-10);
  expect(nodeNegativeAxisX.y).toBeLessThan(CLOSE_TO_ZERO);

  expect(nodeNegativeAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodeNegativeAxisY.y).toBe(-10);
});

test("When there are eight nodes uniformly distributed on the ring, the coordinates of each node are obtained", () => {
  const nodePositiveAxisX = constructNodeById("1");
  const nodePositiveAxisY = constructNodeById("2");
  const nodeNegativeAxisX = constructNodeById("3");
  const nodeNegativeAxisY = constructNodeById("4");

  const nodeFirstQuadrant = constructNodeById("5");
  const nodeSecondQuadrant = constructNodeById("6");
  const nodeThirdQuadrant = constructNodeById("7");
  const nodeFourthQuadrant = constructNodeById("8");

  forceSimulation.circularLayout(
    [
      nodePositiveAxisX,
      nodeFirstQuadrant,
      nodePositiveAxisY,
      nodeSecondQuadrant,
      nodeNegativeAxisX,
      nodeThirdQuadrant,
      nodeNegativeAxisY,
      nodeFourthQuadrant,
    ],
    CENTER,
    RADIUS
  );

  expect(nodePositiveAxisX.x).toBe(10);
  expect(nodePositiveAxisX.y).toBe(0);

  expect(nodePositiveAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodePositiveAxisY.y).toBe(10);

  expect(nodeNegativeAxisX.x).toBe(-10);
  expect(nodeNegativeAxisX.y).toBeLessThan(CLOSE_TO_ZERO);

  expect(nodeNegativeAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodeNegativeAxisY.y).toBe(-10);

  expect(nodeFirstQuadrant.x).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_TWO);
  expect(nodeFirstQuadrant.y).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_TWO);

  expect(nodeSecondQuadrant.x).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_TWO);
  expect(nodeSecondQuadrant.y).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_TWO);

  expect(nodeThirdQuadrant.x).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_TWO);
  expect(nodeThirdQuadrant.y).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_TWO);

  expect(nodeFourthQuadrant.x).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_TWO);
  expect(nodeFourthQuadrant.y).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_TWO);
});

test("When there are twelve nodes uniformly distributed on the ring, the coordinates of each node are obtained", () => {
  const nodePositiveAxisX = constructNodeById("1");
  const nodePositiveAxisY = constructNodeById("2");
  const nodeNegativeAxisX = constructNodeById("3");
  const nodeNegativeAxisY = constructNodeById("4");

  const nodeFirstQuadrant1 = constructNodeById("5");
  const nodeSecondQuadrant1 = constructNodeById("6");
  const nodeThirdQuadrant1 = constructNodeById("7");
  const nodeFourthQuadrant1 = constructNodeById("8");

  const nodeFirstQuadrant2 = constructNodeById("5");
  const nodeSecondQuadrant2 = constructNodeById("6");
  const nodeThirdQuadrant2 = constructNodeById("7");
  const nodeFourthQuadrant2 = constructNodeById("8");

  forceSimulation.circularLayout(
    [
      nodePositiveAxisX,
      nodeFirstQuadrant1,
      nodeFirstQuadrant2,
      nodePositiveAxisY,
      nodeSecondQuadrant1,
      nodeSecondQuadrant2,
      nodeNegativeAxisX,
      nodeThirdQuadrant1,
      nodeThirdQuadrant2,
      nodeNegativeAxisY,
      nodeFourthQuadrant1,
      nodeFourthQuadrant2,
    ],
    CENTER,
    RADIUS
  );

  expect(nodePositiveAxisX.x).toBe(10);
  expect(nodePositiveAxisX.y).toBe(0);

  expect(nodePositiveAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodePositiveAxisY.y).toBe(10);

  expect(nodeNegativeAxisX.x).toBe(-10);
  expect(nodeNegativeAxisX.y).toBeLessThan(CLOSE_TO_ZERO);

  expect(nodeNegativeAxisY.x).toBeLessThan(CLOSE_TO_ZERO);
  expect(nodeNegativeAxisY.y).toBe(-10);

  expect(nodeFirstQuadrant1.x).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeFirstQuadrant1.y).toBeLessThanOrEqual(5);

  expect(nodeSecondQuadrant1.x).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeSecondQuadrant1.y).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);

  expect(nodeThirdQuadrant1.x).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeThirdQuadrant1.y).toBeGreaterThanOrEqual(-5);

  expect(nodeFourthQuadrant1.x).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeFourthQuadrant1.y).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);

  expect(nodeFirstQuadrant2.x).toBeGreaterThanOrEqual(5);
  expect(nodeFirstQuadrant2.y).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);

  expect(nodeSecondQuadrant2.x).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeSecondQuadrant2.y).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);

  expect(nodeThirdQuadrant2.x).toBeLessThanOrEqual(-5);
  expect(nodeThirdQuadrant2.y).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);

  expect(nodeFourthQuadrant2.x).toBeLessThanOrEqual(10 * CLOSE_TO_SQUARE_ROOT_THREE);
  expect(nodeFourthQuadrant2.y).toBeGreaterThanOrEqual(-10 * CLOSE_TO_SQUARE_ROOT_THREE);
});

function constructNodeById(id: string): NodeModel {
  const node = new NodeModel(
    id,
    ["label1", "label2"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );
  node.initialPositionCalculated = false;
  return node;
}
