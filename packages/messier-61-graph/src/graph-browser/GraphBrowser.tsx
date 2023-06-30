// Copyright 2023 Paion Data. All rights reserved.
import { store } from "../../../messier-61-app/src";
import { Visualization, VisualizationConnectedBus } from "../visualization-view/VisualizationView";

export function GraphBrowser(): JSX.Element {
  console.log("GraphBrowser被调用");

  return (
    <>
      {/* <VisualizationConnectedBus /> */}
      <Visualization
        editorNodes={store.getState().graphEditor.nodes}
        editorRelationships={[]} />
    </>
  );
}
