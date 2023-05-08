// Copyright 2023 Paion Data. All rights reserved.
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
