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

import ParamsOnSystemDb from './partials/params-on-systemdb'

const title = 'Set a parameter'
const subtitle = 'Set a parameter to be sent with queries.'
const category = 'cypherQueries'
const content = (
  <>
    <p>
      The
      <code>:param name {'=>'} 'Stella'</code> command will define a parameter
      named "name" and it will be sent along with your queries.
      <br /> Using parameters, rather than hard coding values, will allow for
      reuse of the query plan cache
    </p>
    <p>
      The right hand side of
      <code>{'=>'}</code> is sent to the server and evaluated as Cypher with an
      implicit
      <code>RETURN</code> in front. This gives better type safety since some
      types (especially numbers) in JavaScript are hard to match with Neo4j:s
      type system.
      <br /> To set a param as an integer, do
      <code>:param x {'=>'} 1</code> and to set it as a float, do
      <code>:param x {'=>'} 1.0</code>.
      <br /> To set a param as an object, do
      <code>
        {':param obj => ({props:{ name:"Andy", position:"Developer"}})'}
      </code>
    </p>
    <p>
      Cypher query example with a param:
      <code>MATCH (n:Person) WHERE n.name = $name</code>
    </p>
    <ParamsOnSystemDb />
    <div className="links">
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="params">:help params</a>
        </p>
      </div>
    </div>
  </>
)

export default { title, subtitle, category, content }
