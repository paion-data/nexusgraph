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

const title = 'Bolt'
const subtitle = 'Using Bolt in Neo4j Browser'
const category = 'browserUiCommands'
const filter = ['bolt']
const description = (
  <>
    <p>
      By default, Neo4j Browser communicates with the database via Bolt using
      the Neo4j JavaScript Driver. However it is possible to turn off Bolt and
      communicate with the database using HTTP(S) as in older versions of Neo4j
      Browser.
    </p>
  </>
)

export default { title, subtitle, category, content: null, description, filter }
