// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import DbsOnSystemDb from './partials/dbs-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'DROP DATABASE'
const subtitle = 'Delete a database'
const category = 'administration'
const content = (
  <>
    <p>
      The <code>DROP DATABASE</code> command can be used to delete a database.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/databases/#administration-databases-drop-database"
            minVersion="4.0.0"
          >
            DROP DATABASE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-databases">:help SHOW DATABASES</a>{' '}
          <a help-topic="create-database">:help CREATE DATABASE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          DROP DATABASE customers
        </pre>
      </figure>
    </section>
    <DbsOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
