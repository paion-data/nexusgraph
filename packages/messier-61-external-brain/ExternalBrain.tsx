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

import type { CanvasConfig } from "../messier-61-graph";
import { Editor } from "../messier-61-editor";
import { Graph } from "../messier-61-graph";
import { transformer } from "./Transformer";

export default function ExternalBrain(): JSX.Element {
  const [graphData, setGraphData] = useState({
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
