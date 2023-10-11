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

const title = 'UNWIND'
const subtitle = 'Unwind a collection into a sequence of rows'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>UNWIND</code> expands a collection in to a sequence of rows. Any
      existing identifiers are still available after <code>UNWIND</code>.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/unwind/">
            UNWIND
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="match">:help MATCH</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH p = shortestPath( (lucy:Person {name:"Lucy Liu"})-[:ACTED_IN*]-(bacon:Person {name:"Kevin Bacon"}) )
UNWIND nodes(p) as n
RETURN n.name`}
        </pre>
        <figcaption>
          Return a set of actors that form the shortest acquaintance links
          between Lucy Liu and Kevin Bacon.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
