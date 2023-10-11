// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import AdminOnSystemDb from './partials/admin-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'SHOW PRIVILEGES'
const subtitle = 'List available privileges'
const category = 'security'
const content = (
  <>
    <p>
      The <code>SHOW PRIVILEGES</code> command can be used to list available
      privileges for all roles.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/subgraph/#administration-security-subgraph-show"
            minVersion="4.0.0"
          >
            SHOW PRIVILEGES
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="grant">:help GRANT</a>{' '}
          <a help-topic="deny">:help DENY</a>{' '}
          <a help-topic="revoke">:help REVOKE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">SHOW PRIVILEGES</pre>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
