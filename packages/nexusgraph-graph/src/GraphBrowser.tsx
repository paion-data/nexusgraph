// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";

import { ExportButton } from "./export-button/ExportButton";
import { Visualization } from "./VisualizationView";

/**
 * {@link GraphBrowser} abstracts away the graphing capabilities of Nexus Graph.
 *
 * @returns a React DOM object
 */
export default function GraphBrowser(): JSX.Element {
  const [hasVis, setHasVis] = useState<boolean>(true);
  const [visElement, setVisElement] = useState<null | {
    svgElement: unknown;
    graphElement: unknown;
    type: "plan" | "graph";
  }>(null);

  return (
    <>
      <ExportButton visElement={visElement} />
      <Visualization
        assignVisElement={(svgElement: any, graphElement: any) => {
          setVisElement({ svgElement, graphElement, type: "graph" });
          setHasVis(true);
        }}
      />
    </>
  );
}
