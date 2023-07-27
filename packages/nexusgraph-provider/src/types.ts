//Copyright 2023 Paion Data. All rights reserved.
export const NLP_DATA = "nlpData";
export const UPDATE_NLPDATA = "nlpData/UPDATE_NLPDATA";

export interface NlpNodesProps {
  fields: Record<string, string>;
  id: string;
}

export interface NlpLinksProps {
  fields: Record<string, string>;
  source: string;
  target: string;
}

export interface NlpState {
  nodes: NlpNodesProps[];
  links: NlpLinksProps[];
}

export interface NlpAction {
  type: typeof UPDATE_NLPDATA;
  payload: NlpState;
}

export const EDITOR_LINE = "editorLine";
export const UPDATE_LINE = "editorLine/UPDATE_LINE";

export interface EditorAction {
  type: typeof UPDATE_LINE;
  payload: string[];
}
