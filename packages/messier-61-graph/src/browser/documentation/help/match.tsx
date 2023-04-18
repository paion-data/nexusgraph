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
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'MATCH'
const subtitle = 'Describe a data pattern'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>MATCH</code> clause describes a pattern of graph data. Neo4j
      will collect all paths within the graph which match this pattern. This is
      often used with <code>WHERE</code> to filter the collection.
    </p>
    <p>
      The <code>MATCH</code> describes the structure, and <code>WHERE</code>{' '}
      specifies the content of a query.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/match/">
            MATCH
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="where">:help WHERE</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (director:Person)-[:DIRECTED]->(movie)
WHERE director.name = "Steven Spielberg"
RETURN movie.title`}
        </pre>
        <figcaption>
          Find all the many fine films directed by Steven Spielberg.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
