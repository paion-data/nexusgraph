// Copyright 2023 Paion Data. All rights reserved.
import { Link, Node } from "../..";

export const NLP_DATA = "nlpData";
export const UPDATE_NLPDATA = NLP_DATA + "/UPDATE_NLPDATA";

export interface NlpAction {
  type: typeof UPDATE_NLPDATA;
  payload: NlpState;
}

export interface NlpState {
  nodes: Node[];
  links: Link[];
}
