/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
