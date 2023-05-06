// Copyright 2023 Paion Data. All rights reserved.
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
