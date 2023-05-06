// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import AdminOnSystemDb from './partials/admin-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'REVOKE ROLE'
const subtitle = 'Revoke roles from users'
const category = 'security'
const content = (
  <>
    <p>
      The <code>REVOKE ROLE</code> command can be used to revoke roles from
      users, removing access rights from them.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/users-and-roles/#administration-security-roles-revoke"
            minVersion="4.0.0"
          >
            REVOKE ROLE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-roles">:help SHOW ROLES</a>{' '}
          <a help-topic="create-role">:help CREATE ROLE</a>{' '}
          <a help-topic="drop-role">:help DROP ROLE</a>{' '}
          <a help-topic="grant-role">:help GRANT ROLE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          REVOKE ROLE myrole FROM jake
        </pre>
      </figure>
      <figure>
        <pre className="code runnable standalone-example">
          REVOKE ROLES role1, role2 TO user1, user2, user3
        </pre>
        <figcaption>
          It is possible to revoke multiple roles from multiple users in one
          command.
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
