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

import { Code } from '../modules/Stream/Queries/styled'

export const EnterpriseOnlyFrame = ({ command }: any) => {
  return (
    <div>
      <p>
        Unable to display <Code>{command}</Code> because the procedures required
        to run this frame are missing. These procedures are usually found in
        Neo4j Enterprise edition.
      </p>
      <p>
        Find out more over at{' '}
        <a href="https://neo4j.com/editions/" target="_blank" rel="noreferrer">
          neo4j.com/editions
        </a>
      </p>
    </div>
  )
}
