// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import DbsOnSystemDb from './partials/dbs-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'CREATE DATABASE'
const subtitle = 'Create a new database'
const category = 'administration'
const content = (
  <>
    <p>
      The command <code>CREATE DATABASE</code> can be used to create a database.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/databases/#administration-databases-create-database"
            minVersion="4.0.0"
          >
            CREATE DATABASE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-databases">:help SHOW DATABASES</a>{' '}
          <a help-topic="drop-database">:help DROP DATABASE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          CREATE DATABASE customers
        </pre>
      </figure>
    </section>
    <DbsOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
