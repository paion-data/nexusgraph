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

const title = 'Auto-committing transactions'
const subtitle = 'Execute a Cypher query within an auto-committing transaction'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <code>:auto</code> command will send the Cypher query following it, in
      an auto committing transaction. In general this is not recommended because
      of the lack of support for auto retrying on leader switch errors in
      clusters.
      <br />
      Some query types do however need to be sent in auto-committing
      transactions, <code>CALL {'{...}'} IN TRANSACTIONS </code> is the most
      notable one.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="load csv">:help load csv</a>
            <a help-topic="cypher">:help cypher</a>
            <a help-topic="commands">:help commands</a>
          </td>
        </tr>
      </tbody>
    </table>
    <section className="example">
      <figure>
        <pre>{`:auto LOAD CSV FROM 'file:///artists.csv' AS line
CALL {
  WITH line
  CREATE (:Artist {name: line[1], year: toInteger(line[2])})
} IN TRANSACTIONS`}</pre>
        <figcaption>
          Example usage of the <em>:auto</em> command.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
