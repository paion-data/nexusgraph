// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'DETACH DELETE'
const subtitle = 'Delete all nodes and relationships'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>DETACH DELETE</code> clause is used to delete all nodes and
      relationships.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/delete/">
            DELETE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="delete">:help DELETE</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>MATCH (n) DETACH DELETE n</pre>
        <figcaption>Delete all nodes and relationships.</figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
