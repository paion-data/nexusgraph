// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { Visualization } from "./VisualizationView";

/**
 * {@link GraphBrowser} is abstracts away the graphing capabilities of Nexus Graph.
 *
 * @returns a React DOM object
 */
export default function GraphBrowser(): JSX.Element {
  // TODO - 这两个 States 应不应该放入 Redux Store?（从组件独立开源的角度去思考）
  const [hasVis, setHasVis] = useState<boolean>(true);
  const [visElement, setVisElement] = useState<null | {
    svgElement: unknown;
    graphElement: unknown;
    type: "plan" | "graph";
  }>(null);

  return (
    <Visualization
      assignVisElement={(svgElement: any, graphElement: any) => {
        setVisElement({ svgElement, graphElement, type: "graph" });
        setHasVis(true);
      }}
    />
  );
}
