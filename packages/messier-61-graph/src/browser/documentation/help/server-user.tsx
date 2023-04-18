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

const title = 'User admin'
const subtitle = 'User management for administrators'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <code>:server user</code> command allows you to manage user access to
      Neo4j such as creating/deleting users, suspending/activating users,
      managing user roles and resetting passwords.
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
          <a server-topic="user list">:server user list</a>{' '}
          <a server-topic="user add">:server user add</a>
        </p>
      </div>
      <div className="link">
        <p className="title">Notes:</p>
        <p className="content">
          Only available in Neo4j Enterprise.
          <br />
          Only available to users with the admin role.
        </p>
      </div>
    </div>
  </>
)

export default { title, subtitle, category, content }
