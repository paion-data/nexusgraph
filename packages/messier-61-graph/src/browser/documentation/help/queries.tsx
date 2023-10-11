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

const title = 'Query Status'
const subtitle = 'Show query status.'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <a exec-topic="queries">:queries</a> command will list your servers
      and clusters running queries.
      <br />
      From that list you have the ability to kill unwanted queries.
    </p>
  </>
)

export default { title, subtitle, category, content }
