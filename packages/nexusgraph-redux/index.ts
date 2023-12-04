// Copyright 2023 Paion Data. All rights reserved.
export type { GlobalState } from "./src/globalState";
export * from "./src/graph-list/graphListDuck";
export { default, GRAPH_DATA, initialState, selectGraphData, updateGraphData } from "./src/graph/graphDuck";
export type { GraphName, GraphState } from "./src/graph/graphDuck";
export * from "./src/oAuth/oAuthDuck";
export { default as ReduxStoreProvider } from "./src/ReduxStoreProvider";

export interface Node {
  id: string;
  fields: Record<string, string>;
}

export interface Link {
  id: string;
  source: string;
  target: string;
  fields: Record<string, string>;
}

export interface Graph {
  nodes: Node[];
  links: Link[];
}
