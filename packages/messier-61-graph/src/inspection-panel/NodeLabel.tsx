// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import { NonClickableLabelChip } from "../styles/DefaultPane.styled";
import { GraphStyleModel } from "../GraphStyle";

export interface NodeLabelProps {
  selectedLabel: {
    label: string;
    propertyKeys: string[];
    count?: number;
  };
  graphStyle: GraphStyleModel;
  /* The total number of nodes in returned graph */
  allNodesCount?: number | null;
}

export function NodeLabel({ graphStyle, selectedLabel, allNodesCount }: NodeLabelProps): JSX.Element {
  const labels = selectedLabel.label === "*" ? [] : [selectedLabel.label];
  const graphStyleForLabel = graphStyle.forNode({
    labels: labels,
  });

  const count = selectedLabel.label === "*" ? allNodesCount : selectedLabel.count;

  return (
    <NonClickableLabelChip
      style={{
        backgroundColor: graphStyleForLabel.get("color"),
        color: graphStyleForLabel.get("text-color-internal"),
      }}
    >
      {`${selectedLabel.label}${count || count === 0 ? ` (${count})` : ""}`}
    </NonClickableLabelChip>
  );
}
