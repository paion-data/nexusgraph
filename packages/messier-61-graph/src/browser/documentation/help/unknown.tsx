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

const title = 'Unrecognized command'
const content = (
  <>
    <p>Apologies, but that was unparseable or otherwise unrecognized</p>
    <table className="table-condensed table-help">
      <tbody>
        {/* <tr>
        <th className='lead'>You said:</th>
        <td><code className='lead'>{{frame.input | uncomment}}</code></td>
      </tr> */}
        <tr>
          <th>Try:</th>
          <td>
            <ul>
              <li>
                <a help-topic="help">:help</a> - for general help about using
                Neo4j Browser
              </li>
              <li>
                <a help-topic="cypher">:help commands</a> - to see available
                commands
              </li>
              <li>
                <a href="https://neo4j.com/docs/">Neo4j Documentation</a> - for
                detailed information about Neo4j
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>Keys:</th>
          <td>
            <ul>
              <li>
                <code>{'< ctrl - ↑ >'}</code> to retrieve previous entry from
                history.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, content }
