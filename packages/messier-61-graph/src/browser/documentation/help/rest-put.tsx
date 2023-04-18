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

const title = 'REST PUT'
const category = 'restApiCommands'
const content = (
  <>
    <p>
      Use <code>:PUT</code> to send HTTP PUT to Neo4j's REST interface.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        {/* <tr>
        <th>Reference:</th>
        <td><code><a href='{{ neo4j.version | neo4jDeveloperDoc }}/#http-api-index'>REST</a></code></td>
      </tr> */}
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="rest-get">:help REST GET</a>
            <a help-topic="rest-post">:help REST POST</a>
            <a help-topic="rest-delete">:help REST DELETE</a>
          </td>
        </tr>
      </tbody>
    </table>
    <section className="example">
      <figure>
        <pre className="code runnable">
          :PUT /db/data/node/198/properties/foo "Delia"
        </pre>
        <figcaption>Update the name property of node 198.</figcaption>
      </figure>
    </section>
  </>
)

export default { title, category, content }
