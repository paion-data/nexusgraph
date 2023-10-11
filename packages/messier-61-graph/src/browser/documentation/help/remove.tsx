// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'REMOVE'
const subtitle = 'Remove properties and labels'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>REMOVE</code> clause is used to remove properties and labels
      from graph elements.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/remove/">
            REMOVE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="match">:help MATCH</a>
          <a help-topic="where">:help WHERE</a>
          <a help-topic="return">:help RETURN</a>
          <a help-topic="delete">:help DELETE</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (soren {name: 'Soren'})
REMOVE soren.age
RETURN soren`}
        </pre>
        <figcaption>Remove Soren's age.</figcaption>
      </figure>
      <figure className="runnable">
        <pre>
          {`MATCH (soren {name: 'Soren'})
REMOVE soren:Intern
RETURN soren`}
        </pre>
        <figcaption>Soren is no longer an intern.</figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
