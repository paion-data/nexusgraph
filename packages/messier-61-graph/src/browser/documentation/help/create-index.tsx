// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import ManualLink from 'browser-components/ManualLink'
import VersionConditionalDoc from 'browser-components/VersionConditionalDoc'

const title = 'CREATE INDEX'
const subtitle = 'Index labeled nodes by property'
const category = 'schemaClauses'
const content = (
  <>
    <p>
      The <code>CREATE INDEX</code> clause will create and populate an index on
      a property for all nodes that have a certain label.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/indexes-for-search-performance/"
          >
            Indexes for search performance
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <p className="title">Related</p>
        <p className="content">
          <a help-topic="drop-index">:help DROP INDEX</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </p>
      </div>
    </div>
    <VersionConditionalDoc versionCondition=">=4" includeCurrent={true}>
      <>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE INDEX [optionalIndexName] FOR (p:Person) ON (p.name)
            </pre>
            <figcaption>
              Create index on name for all nodes with a Person label.
            </figcaption>
          </figure>
        </section>
      </>
    </VersionConditionalDoc>
    <VersionConditionalDoc versionCondition="<4" includeCurrent={false}>
      <>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE INDEX ON :Person(name)
            </pre>
            <figcaption>
              Create index on name for all nodes with a Person label.
            </figcaption>
          </figure>
        </section>
      </>
    </VersionConditionalDoc>
  </>
)

export default { title, subtitle, category, content }
