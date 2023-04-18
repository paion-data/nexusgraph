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

import ManualLink from 'browser-components/ManualLink'

const title = 'CONTAINS'
const subtitle = 'Matching within in a string'
const category = 'cypherPredicates'
const content = (
  <>
    <p>
      The occurrence of a string within a string can be matched using{' '}
      <code>CONTAINS</code>. The matching is case-sensitive.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/clauses/where/#query-where-string"
          >
            WHERE
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="starts-with">:help STARTS WITH</a>{' '}
          <a help-topic="ends-with">:help ENDS WITH</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure>
        <pre className="code runnable standalone-example">
          MATCH (director:Person) WHERE director.name CONTAINS 'ete' RETURN
          director.name
        </pre>
        <figcaption>
          Match directors with a name that contains with "eter".
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
