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

const title = 'CREATE USER'
const subtitle = 'Create a new user'
const category = 'administration'
const content = (
  <>
    <p>
      The command <code>CREATE USER</code> can be used to create a new user.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/users-and-roles/#administration-security-users-create"
            minVersion="4.0.0"
          >
            CREATE USER
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-users">:help SHOW USERS</a>{' '}
          <a help-topic="alter-user">:help ALTER USER</a>{' '}
          <a help-topic="drop-user">:help DROP USER</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          CREATE USER jake SET PASSWORD 'abc' CHANGE REQUIRED SET STATUS
          SUSPENDED
        </pre>
        <figcaption>
          If the optional SET PASSWORD CHANGE [NOT] REQUIRED is omitted then the
          default is CHANGE REQUIRED. The default for SET STATUS is ACTIVE. The
          password can either be a string value or a string parameter.
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
