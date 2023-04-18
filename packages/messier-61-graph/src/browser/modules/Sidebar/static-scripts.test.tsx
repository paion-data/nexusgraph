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
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Favorites from './static-scripts'
import { folders, scripts } from 'shared/modules/favorites/staticScripts'

describe('<Favorites />', () => {
  // Rename the two show meta-graph scripts so they can be distinguished from each other in DOM
  const documents = scripts.map(script => ({
    ...script,
    isStatic: true,
    content: !script.content.includes('Show meta-graph')
      ? script.content
      : script.versionRange === '>=3 <4'
      ? script.content.replace('Show meta-graph', 'Show meta-graph v3')
      : script.content.replace('Show meta-graph', 'Show meta-graph v4')
  }))

  const renderWithDBMSVersion = (version: any) => {
    const state = {
      documents,
      folders,
      meta: { server: { version } }
    }

    return render(
      <Provider store={createStore(() => state, state) as any}>
        <DndProvider backend={HTML5Backend}>
          <Favorites />
        </DndProvider>
      </Provider>
    )
  }

  it('lists the "Connect to DBMS" example when there is no DBMS version', () => {
    const version = null
    const { queryByText } = renderWithDBMSVersion(version)

    fireEvent.click(queryByText('Basic Queries') as HTMLElement)

    expect(queryByText('Connect to DBMS')).toBeTruthy()
  })

  it('lists only the v3 version of the "Show meta-graph" example when version is 3', () => {
    const version = '3.5.14'
    const { queryByText } = renderWithDBMSVersion(version)

    fireEvent.click(queryByText('Common Procedures') as HTMLElement)

    expect(queryByText('Show meta-graph v3')).toBeTruthy()
    expect(queryByText('Show meta-graph v4')).toBeFalsy()
  })

  it('lists only the v4 version of the "Show meta-graph" example when version is 4', () => {
    const version = '4.0.3'
    const { queryByText } = renderWithDBMSVersion(version)

    fireEvent.click(queryByText('Common Procedures') as HTMLElement)

    expect(queryByText('Show meta-graph v3')).toBeFalsy()
    expect(queryByText('Show meta-graph v4')).toBeTruthy()
  })
})
