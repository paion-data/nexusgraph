/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react'

import AdminOnSystemDb from './partials/admin-on-systemdb'
import ManualLink from 'browser-components/ManualLink'

const title = 'ALTER USER'
const subtitle = 'Modify a user'
const category = 'administration'
const content = (
  <>
    <p>
      The <code>ALTER USER</code> command can be used to modify an existing
      user.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/users-and-roles/#administration-security-users-alter"
            minVersion="4.0.0"
          >
            ALTER USER
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-users">:help SHOW USERS</a>{' '}
          <a help-topic="create-user">:help CREATE USER</a>{' '}
          <a help-topic="drop-user">:help DROP USER</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          ALTER USER jake SET PASSWORD 'abc123'
          <br />
          CHANGE NOT REQUIRED SET STATUS
          <br />
          ACTIVE
        </pre>
        <figcaption>
          Modify the user jake with a new password and active status as well as
          remove the requirement to change his password.
        </figcaption>
      </figure>
      <figure>
        <pre className="code runnable standalone-example">
          ALTER CURRENT USER SET PASSWORD FROM 'abc123' TO '123xyz'
        </pre>
        <figcaption>
          Users can change their own password using ALTER CURRENT USER SET
          PASSWORD. The old password is required in addition to the new one, and
          either or both can be a string value or a string parameter. When a
          user executes this command it will change their password as well as
          set the CHANGE NOT REQUIRED flag.
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
