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

const title = 'bolt+routing in Neo4j Browser'
const subtitle = 'What drivers are used when'
const category = 'boltProtocol'
const content = (
  <>
    <p>
      There are two kinds of Bolt drivers specified by URI scheme: the 'bolt://'
      scheme is used to create a <b>direct</b> driver and the 'bolt+routing://'
      scheme is used to create a <b>routing</b> driver. In Neo4j Browser, the
      bolt+routing setting is used to control which driver should be used.
      However it is not always appropriate for Neo4j Browser to use a{' '}
      <b>routing</b> driver even when bolt+routing is on.
    </p>
    <p>
      Neo4j Browser will always:
      <ul className="topic-bullets">
        <li>
          use a <b>direct</b> driver for user administration frames
        </li>
        <li>
          use a <b>direct</b> driver to populate sysinfo and the member specific
          items in the information panel e.g. version, cluster role etc
        </li>
      </ul>
    </p>
    <p>
      If bolt+routing is on and the provided URI points to a Core Cluster member
      Neo4j Browser will:
    </p>
    <ul className="topic-bullets">
      <li>
        use a <b>routing</b> driver for all cypher queries submitted via the
        editor (including calls to user administration procedures)
      </li>
      <li>
        use a <b>routing</b> driver to populate the metadata (labels,
        relationship types, properties) in the information panel
      </li>
    </ul>
    <p>
      If bolt+routing is off or the provided URI does not point to a Cluster
      member or the provided URI points to a Read-Replica Cluster member, Neo4j
      Browser will:
    </p>
    <ul className="topic-bullets">
      <li>
        use a <b>direct</b> driver for all cypher queries submitted via the
        editor
      </li>
      <li>
        use a <b>direct</b> driver to populate the metadata (labels,
        relationship types, properties) in the information panel
      </li>
    </ul>
    <p>
      Please note that in order for bolt+routing to work correctly the current
      user must exist on all members in the cluster with the same authentication
      credentials.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        {/* <tr>
    <th>Reference:</th>
    <td><code><a href="{{ neo4j.version | neo4jDeveloperDoc }}/drivers/#driver-driver">Bolt drivers</a></code> manual section</td>
  </tr> */}
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="bolt">:help bolt</a>{' '}
            <a help-topic="bolt-encryption">:help bolt encryption</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
