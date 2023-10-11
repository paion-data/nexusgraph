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

const title = 'MERGE'
const subtitle = 'Create missing graph data'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>MERGE</code> clause ensures that an expected pattern exists in
      the graph, reconciling whether data was found, or needs to be created
      through sub-clauses <code>ON CREATE</code> and <code>ON MATCH</code>
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/merge/">
            MERGE
          </ManualLink>{' '}
          manual page
          <br />
          <ManualLink
            chapter="cypher-manual"
            page="/clauses/merge/#query-merge-on-create-on-match"
          >
            ON CREATE and ON MATCH
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="match">:help MATCH</a>
          <a help-topic="create">:help CREATE</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MERGE (charlie:Person { name:'Charlie Sheen', age:10 })
RETURN charlie`}
        </pre>
        <figcaption>
          Look for a person named Charlie Sheen, age 10. If not found, create
          such a person.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
