// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'DELETE'
const subtitle = 'Delete nodes and relationships'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>DELETE</code> clause is used to delete nodes and relationships
      identified within a <code>MATCH</code> clause, possibly qualified by a{' '}
      <code>WHERE</code>. Remember that you can not delete a node without also
      deleting relationships that start or end on said node.
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
          <a help-topic="detach-delete">:help DETACH DELETE</a>
          <a help-topic="match">:help MATCH</a>
          <a help-topic="where">:help WHERE</a>
          <a help-topic="remove">:help REMOVE</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH (n)-[r]-()
WHERE n.name = 'Soren'
DELETE r`}
        </pre>
        <figcaption>Remove all of Soren's friends.</figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
