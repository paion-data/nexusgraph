// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'WHERE'
const subtitle = 'Filter results'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>WHERE</code> clause imposes conditions on the data within a
      potentially matching path, filtering the result set of a{' '}
      <code>MATCH</code>.
    </p>
    <p>
      <code>MATCH</code> describes the structure, and <code>WHERE</code>{' '}
      specifies the content of a query.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/where/">
            WHERE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="match">:help MATCH</a>
          <a help-topic="return">:help RETURN</a>
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
