import type { GraphData } from "../messier-61-graph";

import { makeGraphFromSvoTripples } from "../messier-61-graph/GraphDataMaker";
import { getSVOof } from "../messier-61-nlp/BasicSVOParser";

export function transformer(editorLines: string[]): GraphData {
  const svoTripples: string[][] = editorLines
    .map((editorLine) => getSVOof(editorLine))
    .filter((pos) => pos.length === 3);

  console.log(`makeGraphFromSvoTripples(svoTripples) = ${JSON.stringify(makeGraphFromSvoTripples(svoTripples))}`);
  return makeGraphFromSvoTripples(svoTripples);
}
