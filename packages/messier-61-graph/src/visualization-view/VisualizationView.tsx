// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { NodeModel } from "../models/Node";
import { RelationshipModel } from "../models/Relationship";
import { GraphVisualizer } from "../GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";

export interface VisualizationProps {
  editorNodes: NodeModel[];
  editorRelationships: RelationshipModel[];
}

export default function Visualization(props: VisualizationProps): JSX.Element | null {
  const [nodes, setNodes] = useState<NodeModel[]>([]);
  const [relationships, setRelationships] = useState<RelationshipModel[]>([]);

  useEffect(() => {
    setNodes(props.editorNodes);
    setRelationships(props.editorRelationships);
  }, [props.editorNodes, props.editorNodes]);

  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer nodes={nodes} relationships={relationships} />
    </StyledVisContainer>
  );
}
