/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { makeGraphDataFromSvoTripples } from "./GraphDataMaker";

let counter = 1;

beforeEach(() => {
  counter = 1;
});

test("two separate tripples can be generated", () => {
  const tripples: string[][] = [
    ["I", "like", "Apple"],
    ["He", "likes", "Google"],
  ];

  expect(makeGraphDataFromSvoTripples(tripples, constantIdGenerator)).toStrictEqual({
    nodes: [
      {
        id: "1",
        name: "I",
      },
      {
        id: "2",
        name: "Apple",
      },
      {
        id: "4",
        name: "He",
      },
      {
        id: "5",
        name: "Google",
      },
    ],
    links: [
      {
        id: "3",
        name: "like",
        source: "1",
        target: "2",
      },
      {
        id: "6",
        name: "likes",
        source: "4",
        target: "5",
      },
    ],
  });
});

test("3 nodes connected in a line can be generated", () => {
  const tripples: string[][] = [
    ["I", "like", "Apple"],
    ["I", "hate", "Tencent"],
  ];

  expect(makeGraphDataFromSvoTripples(tripples, constantIdGenerator)).toStrictEqual({
    nodes: [
      {
        id: "1",
        name: "I",
      },
      {
        id: "2",
        name: "Apple",
      },
      {
        id: "5",
        name: "Tencent",
      },
    ],
    links: [
      {
        id: "3",
        name: "like",
        source: "1",
        target: "2",
      },
      {
        id: "6",
        name: "hate",
        source: "1",
        target: "5",
      },
    ],
  });
});

function constantIdGenerator(): string {
  return `${counter++}`;
}
