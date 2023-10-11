// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'RETURN'
const subtitle = 'data from a query'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>RETURN</code> clause defines what to include in a query result
      set, specified as a comma separated list of expressions.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/return/">
            RETURN
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
          {`MATCH (director:Person)-[:DIRECTED]->(movie)
RETURN director.name AS Director, collect(movie.title) AS Movies`}
        </pre>
        <figcaption>
          Return all directors, each paired with a collection of the movies
          they've directed.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
