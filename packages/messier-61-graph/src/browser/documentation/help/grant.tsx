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

const title = 'GRANT'
const subtitle = 'Grant privileges to roles'
const category = 'security'
const content = (
  <>
    <p>
      The <code>GRANT</code> command allows an administrator to grant a
      privilege to a role in order to access an entity.
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
          <a help-topic="revoke">:help REVOKE</a>{' '}
          <a help-topic="deny">:help DENY</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          GRANT graph-privilege ON GRAPH dbname entity TO role
        </pre>
        <figcaption>
          Grant a subgraph privilege to a role (eg. write nodes/relationships).
        </figcaption>
      </figure>
      <figure>
        <pre className="code runnable standalone-example">
          GRANT database-privilege ON DATABASE dbname TO role
        </pre>
        <figcaption>
          Grant a database administrative privilege to a role (eg. create index
          or start/stop database).
        </figcaption>
      </figure>
    </section>
    <AdminOnSystemDb />
  </>
)
export default { title, subtitle, category, content }
