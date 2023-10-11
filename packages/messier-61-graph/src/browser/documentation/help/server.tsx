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

const title = 'Server'
const subtitle = 'Server connection management'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <code>:server</code> command lets you manage the connection to Neo4j,
      such as connecting, disconnecting and viewing metadata for the current
      connection.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Usage:</p>
        <p className="content">
          <code>{':server <action>'}</code>
        </p>
      </div>
      <div className="link">
        <p className="title">Actions:</p>
        <p className="content">
          <a server-topic="status">:server status</a>{' '}
          <a server-topic="change-password">:server change-password</a>
        </p>
      </div>
      <div className="link">
        <p className="title">Auth:</p>
        <p className="content">
          <a server-topic="connect">:server connect</a>{' '}
          <a server-topic="disconnect">:server disconnect</a>
        </p>
      </div>
      <div className="link">
        <p className="title">User:</p>
        <p className="content">
          <a help-topic="server-user">:help server user</a>
        </p>
      </div>
    </div>
  </>
)

export default { title, subtitle, category, content }
