/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../messier-61-home/Home";
import type { GraphData, CanvasConfig } from "../messier-61-graph";
import { Graph } from "../messier-61-graph";

export default function App(): JSX.Element {
  const graphData: GraphData = {
    nodes: [
      {
        id: "1",
        name: "node1",
      },
      {
        id: "2",
        name: "node2",
      },
      {
        id: "3",
        name: "node3",
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
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/externalbrain" element={<Graph graphData={graphData} canvasConfig={canvasConfig} />} />
      </Routes>
    </Router>
  );
}
