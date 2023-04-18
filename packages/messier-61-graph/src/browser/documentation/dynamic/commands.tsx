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

const title = 'Commands'
const subtitle = 'Typing commands is 1337'
const category = 'browserUiCommands'
const filter = ['help']
const description = (
  <>
    <p>
      In addition to composing and running Cypher queries, the editor bar up
      above ↑ understands a few client-side commands, which begin with a
      <code>:</code>. Without a colon, we'll assume you're trying to enter a
      Cypher query.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Usage:</th>
          <td>
            <code>{':help <topic>'}</code>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)
const footer = (
  <>
    <h3>Next steps</h3>
    <ul>
      <li>
        <a help-topic="keys">Help keys</a> - Keyboard shortcuts
      </li>
      <li>
        <a play-topic="cypher">Cypher</a> - Learn Cypher basics
      </li>
      <li>
        <a play-topic="start">Play start</a> - Back to getting started
      </li>
    </ul>
  </>
)

export default {
  title,
  subtitle,
  category,
  content: null,
  description,
  filter,
  footer
}
