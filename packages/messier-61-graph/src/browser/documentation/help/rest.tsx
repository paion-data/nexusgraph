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

const title = 'REST'
const subtitle = 'Any HTTP verb'
const category = 'restApiCommands'
const content = (
  <>
    <p>
      The editor bar has convenience commands for sending any HTTP verb help to
      Neo4j's REST API. For PUT and POST, include a JSON payload.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="rest-get">:help REST GET</a>,
            <a help-topic="rest-post">:help REST POST</a>,
            <a help-topic="rest-put">:help REST PUT</a>,
            <a help-topic="rest-delete">:help REST DELETE</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
