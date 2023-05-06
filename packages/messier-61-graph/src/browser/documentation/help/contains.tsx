// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'CONTAINS'
const subtitle = 'Matching within in a string'
const category = 'cypherPredicates'
const content = (
  <>
    <p>
      The occurrence of a string within a string can be matched using{' '}
      <code>CONTAINS</code>. The matching is case-sensitive.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/clauses/where/#query-where-string"
          >
            WHERE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="starts-with">:help STARTS WITH</a>{' '}
          <a help-topic="ends-with">:help ENDS WITH</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          MATCH (director:Person) WHERE director.name CONTAINS 'ete' RETURN
          director.name
        </pre>
        <figcaption>
          Match directors with a name that contains with "eter".
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
