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
import { render, screen } from '@testing-library/react'
import React from 'react'

import { DETAILS_PANE_STEP_SIZE, DetailsPane } from './DetailsPane'
import { VizItemProperty } from 'neo4j-arc/common'
import { GraphStyleModel, VizItem } from 'neo4j-arc/graph-visualization'

describe('<DetailsPane />', () => {
  const mockGraphStyle = new GraphStyleModel()

  const getMockProperties: (length: number) => VizItemProperty[] = length =>
    Array.from({ length: length }).map((_v, index) => {
      return {
        key: `prop${String(index).padStart(String(length).length, '0')}`,
        type: 'string',
        value: 'hej'
      }
    })

  type RenderComponentProps = {
    propertyList?: VizItemProperty[]
    labels?: string[]
    type?: 'node' | 'relationship'
    width?: number
  }
  const renderComponent = ({
    propertyList = [],
    labels = [],
    type = 'node',
    width = 200
  }: RenderComponentProps) => {
    let mockVizItem: VizItem
    switch (type) {
      case 'node':
        mockVizItem = {
          type: type,
          item: {
            id: 'abc',
            labels,
            propertyList
          }
        }
        break
      case 'relationship':
        mockVizItem = {
          type: type,
          item: {
            id: 'abc',
            type: 'abc2',
            propertyList
          }
        }
    }
    return render(
      <DetailsPane
        graphStyle={mockGraphStyle}
        vizItem={mockVizItem}
        nodeInspectorWidth={width}
      />
    )
  }

  test('should handle show all properties', async () => {
    renderComponent({ propertyList: getMockProperties(1001) })

    expect(screen.getByRole('button', { name: 'Show all' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Show 2 more' })
    ).toBeInTheDocument() // id is added to list of properties so only showing 999
    expect(screen.queryByText('prop1000')).not.toBeInTheDocument()

    const showAllButton = screen.getByText('Show all')
    showAllButton.click()

    expect(screen.getByText('prop1000')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Show all' })
    ).not.toBeInTheDocument()
  })

  test('should handle show more properties', async () => {
    renderComponent({ propertyList: getMockProperties(2001) })

    expect(
      screen.getByRole('button', {
        name: `Show ${DETAILS_PANE_STEP_SIZE} more`
      })
    ).toBeInTheDocument()
    expect(screen.queryByText('prop1000')).not.toBeInTheDocument()

    const showMoreButton = screen.getByRole('button', {
      name: `Show ${DETAILS_PANE_STEP_SIZE} more`
    })
    showMoreButton.click()

    expect(screen.getByText('prop1000')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Show all' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Show 2 more' })
    ).toBeInTheDocument()
  })
})
