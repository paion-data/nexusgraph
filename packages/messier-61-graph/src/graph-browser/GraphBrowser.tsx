// Copyright 2023 Paion Data. All rights reserved.
import { Visualization, VisualizationConnectedBus } from "../visualization-view/VisualizationView";

export function GraphBrowser(): JSX.Element {
  console.log("GraphBrowser被调用");

  return (
  <>
  {/* <VisualizationConnectedBus /> */}
  <Visualization editorNodes={[]} editorRelationships={[]} />
  </>
  );
}
