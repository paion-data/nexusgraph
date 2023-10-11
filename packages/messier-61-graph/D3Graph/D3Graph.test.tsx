// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import { D3Graph } from "./D3Graph";
import type { CanvasConfig, GraphData } from "../GraphConfig";
import { render } from "@testing-library/react";

jest.useRealTimers();

test("[Sanity Check] Components loads without error", async () => {
  render(getTestGraph());
  await new Promise((resolve) => setTimeout(resolve, 10000));
}, 20000);

function getTestGraph(): JSX.Element {
  const graphData: GraphData = {
    nodes: [
      {
        id: "1",
        name: "Austin",
      },
      {
        id: "2",
        name: "Cola",
      },
      {
        id: "3",
        name: "Anan",
      },
    ],
    links: [
      {
        id: "4",
        name: "link1",
        source: "1",
        target: "2",
      },
    ],
  };

  const canvasConfig: CanvasConfig = {
    width: 960,
    height: 500,
    margin: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
  };

  return <D3Graph graphData={graphData} canvasConfig={canvasConfig} />;
}
