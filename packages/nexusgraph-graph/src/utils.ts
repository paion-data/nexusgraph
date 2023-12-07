// Copyright 2023 Paion Data. All rights reserved.

import { produce } from "immer";
import { GraphState } from "../../nexusgraph-redux";

export const mutateNodeFieldById = (
  oldGraphState: GraphState,
  nodeId: string,
  fieldName: string,
  newFieldValue: string
): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.nodes.forEach((node) => {
      if (node.id == nodeId) {
        node.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};

export const mutateLinkFieldById = (
  oldGraphState: GraphState,
  linkId: string,
  fieldName: string,
  newFieldValue: string
): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.links.forEach((link) => {
      if (link.id == linkId) {
        link.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};
