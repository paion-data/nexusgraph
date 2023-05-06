// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ParamsOnSystemDb from './partials/params-on-systemdb'

const title = 'Parameters'
const subtitle = 'View and set parameters to be sent with queries.'
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
      <br />
      To set a param as an integer, do
      <code>:param x {'=>'} 1</code> and to set it as a float, do
      <code>:param x {'=>'} 1.0</code>.
    </p>
    <p>
      If you need more fine-grained control or advanced Cypher queries, you can
      use the explicit syntax: <code>{'x => { ... RETURN 1 as foo }'}</code>
      <br />
      Explicit returns yield a list of records, matching that of your Cypher
      query: <code>{'x => { RETURN 1 as foo }'}</code> yields{' '}
      <code>{'$x = [{foo: 1}]'}</code>
      <br />
      You can pick out individual values from your result using destructuring:{' '}
      <code>{'[{foo}] => { RETURN 1 as foo }'}</code> yields{' '}
      <code>$foo = 1</code>
      <br />
      You can also rename destructured params:{' '}
      <code>{'[{foo: bar}] => { RETURN 1 as foo }'}</code> yields{' '}
      <code>$bar = 1</code>
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
          <a help-topic="param">:help param</a>
        </p>
      </div>
    </div>
  </>
)

export default { title, subtitle, category, content }
