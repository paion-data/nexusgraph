/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import type { GraphData } from "../messier-61-graph/temporary";

import { makeGraphDataFromSvoTripples } from "../messier-61-graph/temporary/GraphDataMaker";
import { getSVOof } from "../messier-61-nlp/BasicSVOParser";

export function transformer(editorLines: string[]): GraphData {
  const svoTripples: string[][] = editorLines
    .map((editorLine) => getSVOof(editorLine))
    .filter((pos) => pos.length === 3);

  return makeGraphDataFromSvoTripples(svoTripples, randomIdGenerator);
}

function randomIdGenerator(): string {
  return Math.random().toString(36).substring(2, 8);
}
