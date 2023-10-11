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
import VersionConditionalDoc from 'browser-components/VersionConditionalDoc'

const title = 'CREATE CONSTRAINT'
const subtitle =
  'Create a property constraint on a node label or relationship type'
const category = 'schemaClauses'
const content = (
  <>
    <p>
      The <code>CREATE CONSTRAINT</code> clause will create a property
      constraint on all nodes/relationships that have the specified label/type.
    </p>
    <p>
      The <code>IS UNIQUE</code> property constraint will create an accompanying
      index.
    </p>
    <div className="links">
      <div className="link">
        <p className="title">Reference</p>
        <p className="content">
          <ManualLink
            chapter="cypher-manual"
            page="/administration/constraints/"
          >
            Constraints
          </ManualLink>{' '}
          manual page
        </p>
      </div>
      <div className="link">
        <div className="title">Related</div>
        <div className="content">
          <a help-topic="drop-constraint">:help DROP CONSTRAINT</a>{' '}
          <a help-topic="schema">:help Schema</a>{' '}
          <a help-topic="cypher">:help Cypher</a>
        </div>
      </div>
    </div>
    <VersionConditionalDoc versionCondition=">=4.4" includeCurrent={true}>
      <>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] FOR (p:Person) REQUIRE
              p.name IS UNIQUE
            </pre>
            <figcaption>
              Create a unique property constraint on the label Person and
              property name.
            </figcaption>
          </figure>
        </section>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] FOR (p:Person) REQUIRE
              p.name IS NOT NULL
            </pre>
            <figcaption>
              Create a node property existence constraint on the label Person
              and property name.
            </figcaption>
          </figure>
        </section>
        <section className=" example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] FOR ()-[l:LIKED]-()
              REQUIRE l.when IS NOT NULL
            </pre>
            <figcaption>
              Create a relationship property existence constraint on the type
              LIKED and property when.
            </figcaption>
          </figure>
        </section>
      </>
    </VersionConditionalDoc>
    <VersionConditionalDoc versionCondition="<4.4 >=4.3" includeCurrent={false}>
      <>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON (p:Person) ASSERT
              p.name IS UNIQUE
            </pre>
            <figcaption>
              Create a unique property constraint on the label Person and
              property name.
            </figcaption>
          </figure>
        </section>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON (p:Person) ASSERT
              p.name IS NOT NULL
            </pre>
            <figcaption>
              Create a node property existence constraint on the label Person
              and property name.
            </figcaption>
          </figure>
        </section>
        <section className=" example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON ()-[l:LIKED]-()
              ASSERT l.when IS NOT NULL
            </pre>
            <figcaption>
              Create a relationship property existence constraint on the type
              LIKED and property when.
            </figcaption>
          </figure>
        </section>
      </>
    </VersionConditionalDoc>
    <VersionConditionalDoc versionCondition="<4.3 >=4" includeCurrent={false}>
      <>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON (p:Person) ASSERT
              p.name IS UNIQUE
            </pre>
            <figcaption>
              Create a unique property constraint on the label Person and
              property name.
            </figcaption>
          </figure>
        </section>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON (p:Person) ASSERT
              exists(p.name)
            </pre>
            <figcaption>
              Create a node property existence constraint on the label Person
              and property name.
            </figcaption>
          </figure>
        </section>
        <section className=" example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT [optionalConstraintName] ON ()-[l:LIKED]-()
              ASSERT exists(l.when)
            </pre>
            <figcaption>
              Create a relationship property existence constraint on the type
              LIKED and property when.
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
              CREATE CONSTRAINT ON (p:Person) ASSERT p.name IS UNIQUE
            </pre>
            <figcaption>
              Create a unique property constraint on the label Person and
              property name.
            </figcaption>
          </figure>
        </section>
        <section className="example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT ON (p:Person) ASSERT exists(p.name)
            </pre>
            <figcaption>
              Create a node property existence constraint on the label Person
              and property name.
            </figcaption>
          </figure>
        </section>
        <section className=" example">
          <figure>
            <pre className="code runnable standalone-example">
              CREATE CONSTRAINT ON ()-[l:LIKED]-() ASSERT exists(l.when)
            </pre>
            <figcaption>
              Create a relationship property existence constraint on the type
              LIKED and property when.
            </figcaption>
          </figure>
        </section>
      </>
    </VersionConditionalDoc>
  </>
)

export default { title, subtitle, category, content }
