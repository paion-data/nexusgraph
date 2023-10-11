// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { NonClickableRelTypeChip } from "../styles/DefaultPane.styled";
import { GraphStyleModel } from "../GraphStyle";

export interface RelTypeProps {
  graphStyle: GraphStyleModel;
  selectedRelType: { relType: string; propertyKeys: string[]; count?: number };
}

export function RelType({ selectedRelType, graphStyle }: RelTypeProps): JSX.Element {
  const styleForRelType = graphStyle.forRelationship({
    type: selectedRelType.relType,
  });
  return (
    <NonClickableRelTypeChip
      style={{
        backgroundColor: styleForRelType.get("color"),
        color: styleForRelType.get("text-color-internal"),
      }}
    >
      {selectedRelType.count === undefined
        ? `${selectedRelType.relType}`
        : `${selectedRelType.relType} (${selectedRelType.count})`}
    </NonClickableRelTypeChip>
  );
}
