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
import { combineReducers, createStore } from 'redux'
import { createBus } from 'suber'

import { ErrorsView, ErrorsViewProps } from './ErrorsView'
import reducers from 'project-root/src/shared/rootReducer'
import { BrowserError } from 'services/exceptions'

const mount = (partOfProps: Partial<ErrorsViewProps>) => {
  const defaultProps: ErrorsViewProps = {
    result: null,
    bus: createBus(),
    params: {},
    executeCmd: jest.fn(),
    setEditorContent: jest.fn(),
    neo4jVersion: null
  }
  const props = {
    ...defaultProps,
    ...partOfProps
  }
  const reducer = combineReducers({ ...(reducers as any) })
  const store: any = createStore(reducer)
  return render(<ErrorsView store={store} {...props} />)
}

describe('ErrorsView', () => {
  test('displays nothing if no errors', () => {
    // Given
    const props = {
      result: null
    }

    // When
    const { container } = mount(props)

    // Then
    expect(container).toMatchSnapshot()
  })
  test('does displays an error', () => {
    // Given
    const error: BrowserError = {
      code: 'Test.Error',
      message: 'Test error description',
      type: 'Neo4jError'
    }
    const props = {
      result: error
    }

    // When
    const { container } = mount(props)

    // Then
    expect(container).toMatchSnapshot()
  })
  test('displays procedure link if unknown procedure', () => {
    // Given
    const error: BrowserError = {
      code: 'Neo.ClientError.Procedure.ProcedureNotFound',
      message: 'not found',
      type: 'Neo4jError'
    }
    const props = {
      result: error
    }

    // When
    const { container, getByText } = mount(props)

    // Then
    expect(container).toMatchSnapshot()
    expect(getByText('List available procedures')).not.toBeUndefined()
  })
  test('displays procedure link if periodic commit error', () => {
    // Given
    const error: BrowserError = {
      code: 'Neo.ClientError.Statement.SemanticError',
      message:
        'Executing queries that use periodic commit in an open transaction is not possible.',
      type: 'Neo4jError'
    }
    const props = {
      result: error
    }

    // When
    const { getByText } = mount(props)

    // Then
    // We need to split up because of the use of <code> tags in the rendered document
    expect(getByText(/info on the/i)).not.toBeUndefined()
    expect(getByText(':auto')).not.toBeUndefined()
    expect(getByText('(auto-committing transactions)')).not.toBeUndefined()
  })
})
