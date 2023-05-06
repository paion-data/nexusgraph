// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'STARTS WITH'
const subtitle = 'Matching the start of a string'
const category = 'cypherPredicates'
const content = (
  <>
    <p>
      The start of strings can be matched using <code>STARTS WITH</code>. The
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
          <a help-topic="ends-with">:help ENDS WITH</a>{' '}
          <a help-topic="contains">:help CONTAINS</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (director:Person)
WHERE director.name STARTS WITH 'Pet'
RETURN director.name`}
        </pre>
        <figcaption>
          Match directors with a name that starts with "Pet".
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
