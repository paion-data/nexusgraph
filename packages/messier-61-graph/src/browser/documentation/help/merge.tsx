// Copyright 2023 Paion Data. All rights reserved.
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
