// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import AdminOnSystemDb from './partials/admin-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'DENY'
const subtitle = 'Deny privileges to roles'
const category = 'security'
const content = (
  <>
    <p>
      The <code>DENY</code> command allows an administrator to deny a privilege
      to a role in order to prevent access to an entity.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/subgraph/#administration-security-subgraph-introduction"
            minVersion="4.0.0"
          >
            Subgraph security
          </ManualLink>{' '}
          manual page
          <br />
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/administration/#administration-security-administration-database-privileges"
            minVersion="4.0.0"
          >
            Database administration
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-privileges">:help SHOW PRIVILEGES</a>{' '}
          <a help-topic="grant">:help GRANT</a>{' '}
          <a help-topic="revoke">:help REVOKE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          DENY graph-privilege ON GRAPH dbname entity TO role
        </pre>
        <figcaption>
          Deny a subgraph privilege to a role (eg. write nodes/relationships).
        </figcaption>
      </figure>
      <figure>
        <pre className="code runnable standalone-example">
          DENY database-privilege ON DATABASE dbname TO role
        </pre>
        <figcaption>
          Deny a database administrative privilege to a role (eg. create index
          or start/stop database).
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
