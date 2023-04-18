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

const title = 'PROFILE'
const subtitle = 'Profile query execution'
const category = 'executionPlans'
const content = (
  <>
    <p>
      Prefix any query with the <code>PROFILE</code> keyword to have Neo4j
      return the execution plan for the query, including detailed profiling
      information.
    </p>
    <p>
      See <a help-topic="query plan">:help QUERY PLAN</a> for a guide to
      understanding the query plan output.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference:</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/execution-plans/">
            Execution Plans
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="explain">:help EXPLAIN</a>{' '}
          <a help-topic="query plan">:help QUERY PLAN</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          PROFILE MATCH (n:Person) RETURN n LIMIT 25
        </pre>
        <figcaption>
          Find nodes with the Person label, and profile query execution.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
