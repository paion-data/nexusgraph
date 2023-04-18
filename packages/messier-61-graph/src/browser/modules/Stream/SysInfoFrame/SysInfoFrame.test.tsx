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
import { combineReducers, createStore } from 'redux'
import { Bus } from 'suber'

import { SysInfoFrame, SysInfoFrameProps } from './SysInfoFrame'
import reducers from 'project-root/src/shared/rootReducer'
import { Database } from 'shared/modules/dbMeta/dbMetaDuck'
import { Frame } from 'shared/modules/frames/framesDuck'

const baseProps = {
  databases: [],
  bus: { self: () => undefined } as unknown as Bus,
  frame: {} as Frame,
  hasMultiDbSupport: true,
  isConnected: true,
  isEnterprise: true,
  useDb: 'neo4j',
  isFullscreen: false,
  isCollapsed: false,
  isOnCluster: true,
  namespacesEnabled: false,
  metricsPrefix: 'neo4j'
}

const mountWithStore = (props: Partial<SysInfoFrameProps>) => {
  const reducer = combineReducers({ ...(reducers as any) })
  const store: any = createStore(reducer)
  return render(
    <Provider store={store}>
      <SysInfoFrame {...baseProps} {...props} />
    </Provider>
  )
}

describe('sysinfo component', () => {
  test('should not render cluster table', () => {
    // Given
    const props = { isOnCluster: false, isConnected: true }

    // When
    const { queryByTestId } = render(<SysInfoFrame {...baseProps} {...props} />)

    // Then
    expect(queryByTestId('sysinfo-cluster-members-title')).toBeNull()
  })

  test('should display error when there is no connection', () => {
    // Given
    const props = { isConnected: false }

    // When
    const { getByText } = mountWithStore(props)

    // Then
    expect(getByText(/No connection available/i)).not.toBeNull()
  })

  test('should display all sysinfo content for enterprise edition', () => {
    // Given
    const databases = [
      { name: 'neo4j', address: '0.0.0.0:7687', status: 'online' },
      { name: 'system', address: '0.0.0.0:7687', status: 'online' }
    ] as Database[]
    const props = {
      isConnected: true,
      isEnterprise: true,
      hasMultiDbSupport: true,
      databases: databases
    }

    // When
    const { queryByText } = render(<SysInfoFrame {...baseProps} {...props} />)

    // Then
    expect(queryByText('Databases')).not.toBeNull()
    expect(queryByText('Store Size')).not.toBeNull()
    expect(queryByText('Id Allocation')).not.toBeNull()
    expect(queryByText('Page Cache')).not.toBeNull()
    expect(queryByText('Transactions')).not.toBeNull()

    expect(
      queryByText(
        'Complete sysinfo is available only in Neo4j Enterprise Edition.'
      )
    ).toBeNull()
  })

  test('should display only databases table and disclaimer for not enterprise editions', () => {
    // Given
    const databases = [
      { name: 'neo4j', address: '0.0.0.0:7687', status: 'online' },
      { name: 'system', address: '0.0.0.0:7687', status: 'online' }
    ] as Database[]
    const props = {
      isConnected: true,
      isEnterprise: false,
      hasMultiDbSupport: true,
      databases: databases
    }

    // When
    const { queryByText } = render(<SysInfoFrame {...baseProps} {...props} />)

    // Then
    expect(queryByText('Databases')).not.toBeNull()
    expect(
      queryByText(
        'Complete sysinfo is available only in Neo4j Enterprise Edition.'
      )
    ).not.toBeNull()

    // And
    expect(queryByText('Store Size')).toBeNull()
    expect(queryByText('Id Allocation')).toBeNull()
    expect(queryByText('Page Cache')).toBeNull()
    expect(queryByText('Transactions')).toBeNull()
  })
})
