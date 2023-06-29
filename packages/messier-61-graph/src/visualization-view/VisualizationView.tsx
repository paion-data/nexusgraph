// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { GraphVisualizer } from "../GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";
import { connect } from "react-redux";
import { GlobalState } from "../shared/globalState";
import { getEditorNodes, getEditorRelationships } from "../shared/editor/editorDuck";
import { withBus } from "react-suber";
import { BasicNode, BasicRelationship } from "../Graph";

export interface VisualizationProps {
  editorNodes: BasicNode[];
  editorRelationships: BasicRelationship[];
}

export function Visualization(props: VisualizationProps): JSX.Element {
  const [nodes, setNodes] = useState<BasicNode[]>(
    [{
      id: "1",
      labels: ["label1", "label2"],
      properties: {name: 'Tom', age: '18'},
      propertyTypes: { name: "string", age: "string" }
    }]);

  const [relationships, setRelationships] = useState<BasicRelationship[]>([]);

  useEffect(() => {
    console.log("graph");
    
    setNodes(nodes.concat(props.editorNodes));
    setRelationships(relationships.concat(props.editorRelationships));
  }, [props.editorNodes, props.editorRelationships]);

  console.log("......................................................................");
  console.log("VisualizationView被调用", nodes);

  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer nodes={nodes} relationships={relationships} />
    </StyledVisContainer>
  );
}

const mapStateToProps = (state: GlobalState) => ({
  editorNodes: getEditorNodes(state),
  editorRelationships: getEditorRelationships(state),
  log: () => {console.log("mapStateToProps");}
});

export const VisualizationConnectedBus = withBus(connect(mapStateToProps)(Visualization));
console.log("VisualizationConnectedBus", VisualizationConnectedBus);
