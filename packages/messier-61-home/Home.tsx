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
import React from "react";
import styles from "./Home.module.css";

import { Link } from "react-router-dom";

import githubIcon from "./images/github-icon.png";
import docIcon from "./images/doc-icon.png";
import wikiIcon from "./images/wiki-icon.webp";
import knowledgeGraph from "./images/knowledge-graph.png";
import genshinImpact from "./images/genshin-impact.webp";

export default function App(): JSX.Element {
  return (
    <div>
      <main>
        <section className={styles.glass}>
          <div className={styles.dashboard}>
            <div className={styles.user}>
              <img src="https://paion-data.github.io/Messier-61/img/logo.svg" width="100px" alt="" />
              <h3>Messier 61</h3>
              <p>Next Generation of Wiki</p>
            </div>
            <div className={styles.links}>
              <div className={styles.link}>
                <img src={docIcon} width="40px" alt="" />
                <h2>Add</h2>
              </div>
              <div className={styles.link}>
                <img src={githubIcon} width="40px" alt="" />
                <a href="https://github.com/paion-data/Messier-61">
                  <h2>GitHub</h2>
                </a>
              </div>
              <div className={styles.link}>
                <img src={wikiIcon} width="40px" alt="" />
                <a href="https://paion-data.github.io/Messier-61/">
                  <h2>Help</h2>
                </a>
              </div>
            </div>
            <div className={styles.pro}>
              <h2>Knowledge Graph Based</h2>
              <img src={knowledgeGraph} width="120px" alt="" />
            </div>
          </div>
          <div className={styles.games}>
            <div className={styles.status}>
              <h1>Recent Wikis</h1>
              <input type="text" />
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <img src={genshinImpact} width="105px" alt="" />
                <div className={styles.cardInfo}>
                  <h2>Genshin Impact</h2>
                  <Link to={`externalbrain`}>Gaming Strategy</Link>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
    </div>
  );
}
