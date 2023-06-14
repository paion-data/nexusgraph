/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { D3Graph } from "./D3Graph";
import type { GraphConfig } from "./GraphConfig";

/**
 * Generates a D3 graph whose content is defined by a provided {@link Graph graph data}.
 *
 * @param props An object containing a list of {@link Graph. Node}'s and list of {@link Graph. Link}'s
 *
 * @returns A D3 visualization of network graph
 */
export default function Graph(graphConfig: GraphConfig): JSX.Element {
  return <D3Graph graphData={graphConfig.graphData} canvasConfig={graphConfig.canvasConfig} />;
}
