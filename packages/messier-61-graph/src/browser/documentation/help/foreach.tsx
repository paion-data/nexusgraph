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

const title = 'FOREACH'
const subtitle = 'Operate on a collection'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>FOREACH</code> clause is used to update data within a collection
      whether components of a path, or result of aggregation.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/foreach/">
            FOREACH
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="create">:help CREATE</a>
          <a help-topic="delete">:help DELETE</a>
          <a help-topic="set">:help SET</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH p = (ups)<-[DEPENDS_ON]-(device) WHERE ups.id='EPS-7001'
FOREACH (n IN nodes(p) | SET n.available = FALSE )`}
        </pre>
        <figcaption>
          Mark all devices plugged into a failed UPS as unavailable.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
