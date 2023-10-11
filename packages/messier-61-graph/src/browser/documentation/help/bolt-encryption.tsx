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

const title = 'Bolt encryption'
const subtitle = 'Certificate handling in web browsers'
const category = 'boltProtocol'
const content = (
  <>
    <p>
      Because of how web browsers handle (self signed) certificates the web
      browser needs to go to a HTTPS URL and accept / permanently trust the
      certificate before a secure Bolt connection to the server can be created.
    </p>
    <p>
      By default Neo4j offers a HTTPS URL on{' '}
      <a href="https://localhost:7473">https://localhost:7473</a>.
    </p>
    <p>
      You will need to manually view (usually by clicking in a broken padlock in
      the address bar) and trust the certificate to be able to create a secure
      connection.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        {/* <tr>
  <th>Reference:</th>
  <td><code><a href="{{ neo4j.version | neo4jDeveloperDoc }}/drivers/#driver-authentication-encryption">Bolt encryption</a></code> manual section</td>
</tr> */}
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="bolt">:help bolt</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
