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
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { VizItem } from 'neo4j-arc/graph-visualization'

import {
  PropertiesTable,
  ELLIPSIS,
  MAX_LENGTH_NARROW,
  MAX_LENGTH_WIDE,
  WIDE_VIEW_THRESHOLD
} from './PropertiesTable'
import { VizItemProperty } from 'neo4j-arc/common'

describe('<DetailsPane />', () => {
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
      <PropertiesTable
        visibleProperties={propertyList}
        onMoreClick={jest.fn()}
        totalNumItems={propertyList.length}
        moreStep={1000}
        nodeInspectorWidth={width}
      />
    )
  }

  test('should handle show more on long property value', async () => {
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    const mockProperty = {
      key: 'propWithLongValue',
      type: 'string',
      value: fullText
    }
    renderComponent({
      propertyList: [mockProperty],
      width: WIDE_VIEW_THRESHOLD - 1
    })

    const expectedCutValue = fullText.slice(0, MAX_LENGTH_NARROW) + ELLIPSIS

    await waitFor(() =>
      expect(screen.getByText(expectedCutValue)).toBeInTheDocument()
    )
    expect(
      screen.getByRole('button', {
        name: 'Show all'
      })
    ).toBeInTheDocument()
    expect(screen.queryByText(fullText)).not.toBeInTheDocument()

    const showAllButton = screen.getByRole('button', {
      name: 'Show all'
    })
    showAllButton.click()

    await waitFor(() => expect(screen.getByText(fullText)).toBeInTheDocument())
    expect(
      screen.queryByRole('button', { name: 'Show all' })
    ).not.toBeInTheDocument()
  })

  test('should cut a long property value to longer size when in wide mode', async () => {
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    const mockProperty = {
      key: 'propWithLongValue',
      type: 'string',
      value: fullText
    }
    renderComponent({
      propertyList: [mockProperty],
      width: WIDE_VIEW_THRESHOLD + 1
    })

    const expectedCutValue = fullText.slice(0, MAX_LENGTH_WIDE) + ELLIPSIS

    await waitFor(() =>
      expect(screen.getByText(expectedCutValue)).toBeInTheDocument()
    )
  })
})
