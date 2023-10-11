// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'SET'
const subtitle = 'property updates'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>SET</code> clause updates properties on nodes and relationships.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/set/">
            SET
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="match">:help MATCH</a>{' '}
          <a help-topic="where">:help WHERE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (fan:Person)-[w:WATCHED]->(movie)
WHERE fan.name = "Mikey"
SET w.rating = 5`}
        </pre>
        <figcaption>
          Mikey likes everything, so give any movie he has watched 5 stars.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
