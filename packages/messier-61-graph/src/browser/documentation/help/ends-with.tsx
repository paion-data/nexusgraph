// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'ENDS WITH'
const subtitle = 'Matching the end of a string'
const category = 'cypherPredicates'
const content = (
  <>
    <p>
      The end of strings can be matched using <code>ENDS WITH</code>. The
      matching is case-sensitive.
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
          <a help-topic="starts-with">:help STARTS WITH</a>
          <a help-topic="contains">:help CONTAINS</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (director:Person)
WHERE director.name ENDS WITH 'ter'
RETURN director.name`}
        </pre>
        <figcaption>
          Match directors with a name that ends with "ter".
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
