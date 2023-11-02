// Copyright 2023 Paion Data. All rights reserved.
export type { GlobalState } from "./src/globalState";
export {
  default,
  GRAPH_DATA,
  initialState,
  INITIAL_GRAPH_NAME,
  selectGraphData,
  updateGraphData,
} from "./src/graph/graphDuck";
export type { GraphName, GraphState } from "./src/graph/graphDuck";
export * from "./src/note-list/noteListDuck";
export * from "./src/note/noteDuck";
export * from "./src/oAuth/oAuthDuck";
export { default as ReduxStoreProvider } from "./src/ReduxStoreProvider";

export interface Node {
  fields: Record<string, string>;
  id: string;
}

export interface Link {
  fields: Record<string, string>;
  source: string;
  target: string;
}

export interface Graph {
  nodes: Node[];
  links: Link[];
}
