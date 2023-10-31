import { updateGraphData } from "./src/graph/graphDuck";

// Copyright 2023 Paion Data. All rights reserved.
export type { GlobalState } from "./src/globalState";
export * from "./src/note-list/noteListDuck";
export * from "./src/oAuth/oAuthDuck";
export { default as ReduxStoreProvider } from "./src/ReduxStoreProvider";

export interface Graph {
  nodes: Node[];
  links: Link[];
}

export interface Node {
  fields: Record<string, string>;
  id: string;
}

export interface Link {
  fields: Record<string, string>;
  source: string;
  target: string;
}

export { GRAPH_DATA, updateGraphData, selectGraphData, initialState, default } from "./src/graph/graphDuck";
export type { GraphState, GraphName } from "./src/graph/graphDuck";
