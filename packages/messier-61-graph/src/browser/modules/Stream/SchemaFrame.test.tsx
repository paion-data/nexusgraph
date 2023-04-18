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
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { SchemaFrame } from './SchemaFrame'

function renderWithRedux(children: any) {
  return render(
    <Provider store={createStore(() => ({}), {}) as any}>{children}</Provider>
  )
}

test('SchemaFrame renders empty', () => {
  const indexResult = { records: [] }
  const { container } = renderWithRedux(
    <SchemaFrame indexes={indexResult} neo4jVersion={null} />
  )

  expect(container).toMatchSnapshot()
})

test('SchemaFrame renders empty for Neo4j >= 4.0', () => {
  const indexResult = { records: [] }
  const { container } = renderWithRedux(
    <SchemaFrame indexes={indexResult} neo4jVersion={'4.0.0-rc1'} />
  )

  expect(container).toMatchSnapshot()
})

test('SchemaFrame renders results for Neo4j >= 4.2', () => {
  const indexResult = {
    success: true,
    result: {
      records: [
        {
          _fields: [
            'INDEX ON :Movie(released)',
            'Movie',
            ['released'],
            'ONLINE',
            'node_label_property',
            {
              version: '2.0',
              key: 'lucene+native'
            }
          ],
          keys: [
            'description',
            'label',
            'properties',
            'state',
            'type',
            'provider'
          ]
        }
      ]
    }
  }
  const firstIndexRecord: any = indexResult.result.records[0]
  firstIndexRecord.get = (key: any) =>
    firstIndexRecord._fields[firstIndexRecord.keys.indexOf(key)]

  const constraintResult = {
    success: true,
    result: {
      records: [
        {
          keys: ['name', 'type', 'entityType', 'labelsOrTypes', 'properties'],
          _fields: [
            'constraint_550b2518',
            'UNIQUE',
            'node',
            ['Movie'],
            ['released']
          ]
        }
      ]
    }
  }
  const firstConstraintRecord: any = constraintResult.result.records[0]
  firstConstraintRecord.get = (key: any) =>
    firstConstraintRecord._fields[firstConstraintRecord.keys.indexOf(key)]

  const { container } = renderWithRedux(
    <SchemaFrame
      indexes={indexResult}
      constraints={constraintResult}
      neo4jVersion={'4.2.1'}
    />
  )

  expect(container).toMatchSnapshot()
})

test('SchemaFrame renders results for Neo4j < 4.0', () => {
  const indexResult = {
    success: true,
    result: {
      records: [
        {
          _fields: [
            'INDEX ON :Movie(released)',
            'Movie',
            ['released'],
            'ONLINE',
            'node_label_property',
            {
              version: '2.0',
              key: 'lucene+native'
            }
          ],
          keys: [
            'description',
            'label',
            'properties',
            'state',
            'type',
            'provider'
          ]
        }
      ]
    }
  }
  const firstIndexRecord: any = indexResult.result.records[0]
  firstIndexRecord.get = (key: any) =>
    firstIndexRecord._fields[firstIndexRecord.keys.indexOf(key)]

  const constraintResult = {
    success: true,
    result: {
      records: [
        {
          keys: ['description'],
          _fields: ['CONSTRAINT ON ( book:Book ) ASSERT book.isbn IS UNIQUE']
        }
      ]
    }
  }
  const firstConstraintRecord: any = constraintResult.result.records[0]
  firstConstraintRecord.get = (key: any) =>
    firstConstraintRecord._fields[firstConstraintRecord.keys.indexOf(key)]

  const { container } = renderWithRedux(
    <SchemaFrame
      indexes={indexResult}
      constraints={constraintResult}
      neo4jVersion={'3.5.13'}
    />
  )

  expect(container).toMatchSnapshot()
})

test('SchemaFrame renders correct suggestion for Neo4j > 3.4', () => {
  const indexResult = { records: [] }
  const { getByText } = renderWithRedux(
    <SchemaFrame indexes={indexResult} neo4jVersion={'3.5.1'} />
  )

  expect(getByText('CALL db.schema.visualization')).not.toBeNull()
})

test('SchemaFrame renders correct suggestion for Neo4j <= 3.4', () => {
  const indexResult = { records: [] }
  const { getByText } = renderWithRedux(
    <SchemaFrame indexes={indexResult} neo4jVersion={'3.4.1'} />
  )

  expect(getByText('CALL db.schema()')).not.toBeNull()
})
