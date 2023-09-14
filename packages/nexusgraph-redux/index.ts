// Copyright 2023 Paion Data. All rights reserved.
export type { GlobalState } from "./src/globalState";
export * from "./src/nlp/nlpTypes";
export * from "./src/note/noteTypes";
export * from "./src/oAuth/oAuthType";
export { default as ReduxStore } from "./src/StoreProvider";

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
