// Copyright 2023 Paion Data. All rights reserved.
export type { GlobalState } from "./src/globalState";
export * from "./src/nlp/nlpTypes";
export * from "./src/note/noteTypes";
export * from "./src/oAuth/oAuthType";
export { default as ReduxStore } from "./src/StoreProvider";

export interface NodeState {
  fields: Record<string, string>;
  id: string;
}

export interface LinkState {
  fields: Record<string, string>;
  source: string;
  target: string;
}

export interface GraphState {
  nodes: NodeState[];
  links: LinkState[];
}
