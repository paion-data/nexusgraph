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

const title = 'CREATE ROLE'
const subtitle = 'Create a new role'
const category = 'security'
const content = (
  <>
    <p>
      The <code>CREATE ROLE</code> command can be used to create roles.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/security/users-and-roles/#administration-security-roles-create"
            minVersion="4.0.0"
          >
            CREATE ROLE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="show-roles">:help SHOW ROLES</a>{' '}
          <a help-topic="drop-role">:help DROP ROLE</a>{' '}
          <a help-topic="grant-role">:help GRANT ROLE</a>{' '}
          <a help-topic="revoke-role">:help REVOKE ROLE</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          CREATE ROLE myrole
        </pre>
      </figure>
      <figure>
        <pre className="code runnable standalone-example">
          CREATE ROLE mysecondrole AS COPY OF myrole
        </pre>
        <figcaption>
          A role can also be copied, keeping its privileges.
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
