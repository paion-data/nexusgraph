/*
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
import React, { useState } from "react";

import styles from "./ExternalBrain.module.css";

import type { CanvasConfig, GraphData } from "../messier-61-graph/temporary";
import { Editor } from "../messier-61-editor";
import { Graph } from "../messier-61-graph/temporary";
import { transformer } from "./Transformer";

/**
 * An {@link ExternalBrain} projects thought process onto a knowledge graph.
 *
 * The module is composed of and depends on 2 modules:
 *
 * 1. {@link messier-61-editor!Editor}
 * 2. {@link messier-61-graph!Graph}
 *
 * The two modules shares a single [state](https://qubitpi.github.io/reactjs.org/reference/react/useState) of
 *
 * ```typescript
 * const [graphData, setGraphData] = useState<GraphData>({
 *   nodes: [],
 *   links: [],
 * });
 * ```
 *
 * which is an instance of {@link messier-61-graph!GraphData}. The state is used in a way almost identical to the
 * [standard React approach](https://qubitpi.github.io/reactjs.org/learn/sharing-state-between-components). The
 * difference, however, is that the change of state inside Editor triggers a Graph state change (i.e. redrawing graph),
 * but **NOT** vice versa. This is based on the assumption that _the external input to our brain affects our through
 * process; but our internal thought process never directly mutates the outside world_
 *
 * The state variable `graphData`'s state value is passed into {@link messier-61-graph!Graph Graph module} and its
 * [set function](https://qubitpi.github.io/reactjs.org/reference/react/useState#setstate) is passed into the
 * {@link messier-61-editor!Editor Editor module}
 *
 * @returns a component whose left side is the {@link Editor} and the right side is the corresponding\
 * {@link Graph knowledge graph}
 *
 * @see {@link messier-61-editor!Editor} for how the state variable `graphData` gets
 */
export default function ExternalBrain(): JSX.Element {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  const windowWidth = window.outerWidth;

  const canvasConfig: CanvasConfig = {
    width: windowWidth / 2.5,
    height: 500,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  return (
    <div>
      <div>
        <h1 className={styles.h1}>Entity Resolution</h1>
        <img className={styles.img} src="https://qubitpi.github.io/Messier-61/img/logo.svg" width="100px" alt="" />
      </div>
      <main>
        <section className={styles.glass1}>
          <div className={styles.dashboard}>
            <Editor
              transformer={transformer}
              exporter={(newGraphData: any) => {
                setGraphData(newGraphData);
              }}
            />
          </div>
        </section>
        <section className={styles.glass2}>
          <div className={styles.graph}>
            <Graph graphData={graphData} canvasConfig={canvasConfig} />
          </div>
        </section>
      </main>
    </div>
  );
}
