// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../../nexusgraph-provider/src/shared/globalState";
import { getEditorNodes, getEditorRelationships } from "../../nexusgraph-provider/src/shared/nlp/nlpDuck";

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
