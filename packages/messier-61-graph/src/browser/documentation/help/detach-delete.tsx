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

const title = 'DETACH DELETE'
const subtitle = 'Delete all nodes and relationships'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>DETACH DELETE</code> clause is used to delete all nodes and
      relationships.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/delete/">
            DELETE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="delete">:help DELETE</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>MATCH (n) DETACH DELETE n</pre>
        <figcaption>Delete all nodes and relationships.</figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
