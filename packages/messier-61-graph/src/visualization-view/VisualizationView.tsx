// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { GraphVisualizer } from "../GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";
import { connect } from "react-redux";
import { GlobalState } from "../shared/globalState";
import { getEditorAction, getEditorNodes, getEditorRelationships } from "../shared/editor/editorDuck";
import { withBus } from "react-suber";
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "../Graph";
import { Action, Dispatch } from "redux";
import { VisualizationDataState, getAllDataAction } from "../shared/visualizationView/visualizationDuck";

export interface VisualizationProps {
  editorNodes: BasicNode[];
  editorRelationships: BasicRelationship[];
}

export function Visualization(props: VisualizationProps): JSX.Element {
  const [nodes, setNodes] = useState<BasicNode[]>([
    {
      id: "V-node",
      labels: ["label1", "label2"],
      properties: { name: 'V-node', age: '18' },
      propertyTypes: { name: "string", age: "string" }
    }
  ]);

  const [relationships, setRelationships] = useState<BasicRelationship[]>([]);

  useEffect(() => {
    console.log("editorNodes", props.editorNodes);
    console.log("AllNodes", nodes.concat(props.editorNodes));


    setNodes(nodes.concat(props.editorNodes));
    setRelationships(relationships.concat(props.editorRelationships));

    console.log("props.nodes", props.editorNodes);
    console.log("props.nodes", props.editorNodes);


  }, [props.editorNodes, props.editorRelationships]);

  console.log("......................................................................");
  console.log("VisualizationView.nodes", nodes);

  return (
    <StyledVisContainer isFullscreen={true}>
      <GraphVisualizer nodes={nodes} relationships={relationships} />
    </StyledVisContainer>
  );
}

const mapStateToProps = (state: GlobalState): VisualizationProps => ({
  editorNodes: getEditorNodes(state),
  editorRelationships: getEditorRelationships(state),
});

// const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
//   updateGraph: (graphData: VisualizationDataState) => {
//     dispatch(getAllDataAction(graphData))
//   }
// })

// export const VisualizationConnectedBus = withBus(connect(mapStateToProps)(Visualization));
export default connect(mapStateToProps)(Visualization)
