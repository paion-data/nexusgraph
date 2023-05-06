// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'

const title = 'FOREACH'
const subtitle = 'Operate on a collection'
const category = 'cypherHelp'
const content = (
  <>
    <p>
      The <code>FOREACH</code> clause is used to update data within a collection
      whether components of a path, or result of aggregation.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink chapter="cypher-manual" page="/clauses/foreach/">
            FOREACH
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="create">:help CREATE</a>
          <a help-topic="delete">:help DELETE</a>
          <a help-topic="set">:help SET</a>
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <section className="example">
      <figure className="runnable">
        <pre>
          {`MATCH p = (ups)<-[DEPENDS_ON]-(device) WHERE ups.id='EPS-7001'
FOREACH (n IN nodes(p) | SET n.available = FALSE )`}
        </pre>
        <figcaption>
          Mark all devices plugged into a failed UPS as unavailable.
        </figcaption>
      </figure>
    </section>
  </>
)

export default { title, subtitle, category, content }
