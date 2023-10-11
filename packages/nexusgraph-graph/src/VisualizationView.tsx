// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "./shared/globalState";
import { getEditorNodes, getEditorRelationships } from "./shared/editor/editorDuck";

import { GraphVisualizer } from "./GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";

export interface VisualizationProps {
  assignVisElement: (svgElement: any, graphElement: any) => void;
}

/**
 * {@link Visualization} is responsible for computing and passing the graph data to the components that draws the gaph,
 * i.e. {@link GraphVisualizer}
 *
 * @returns a DOM object
 */
export function Visualization(props: VisualizationProps): JSX.Element {
  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer
        nodes={useSelector((state: GlobalState) => getEditorNodes(state))}
        relationships={useSelector((state: GlobalState) => getEditorRelationships(state))}
        assignVisElement={props.assignVisElement}
      />
    </StyledVisContainer>
  );
}
