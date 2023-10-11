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
