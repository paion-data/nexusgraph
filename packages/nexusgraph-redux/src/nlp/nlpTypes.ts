// Copyright 2023 Paion Data. All rights reserved.
export const NLP_DATA = "nlpData";
export const UPDATE_NLPDATA = NLP_DATA + "/UPDATE_NLPDATA";

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
