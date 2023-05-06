// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import AdminOnSystemDb from './partials/admin-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'DROP USER'
const subtitle = 'Delete a user'
const category = 'administration'
const content = (
  <>
    <p>
      The command <code>DROP USER</code> can be used to delete an existing user.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/users-and-roles/#administration-security-users-drop"
            minVersion="4.0.0"
          >
            DROP USER
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-users">:help SHOW USERS</a>{' '}
          <a help-topic="drop-user">:help CREATE USER</a>{' '}
          <a help-topic="alter-user">:help ALTER USER</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">DROP USER jake</pre>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
