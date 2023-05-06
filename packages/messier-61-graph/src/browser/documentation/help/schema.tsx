// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'SCHEMA'
const subtitle = 'Database schema indexes'
const category = 'schemaClauses'
const content = (
  <>
    <p>Shows information about database schema indexes and constraints.</p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/administration/">
            Neo4j Database Administration
          </ManualLink>
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="create-index">:help CREATE INDEX</a>
          <a help-topic="drop-index">:help DROP INDEX</a>
          <a help-topic="create-constraint">:help CREATE CONSTRAINT</a>
          <a help-topic="drop-constraint">:help DROP CONSTRAINT</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">:schema</pre>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
