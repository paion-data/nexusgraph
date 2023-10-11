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
import neo4j from 'neo4j-driver'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Bus } from 'suber'

import { Visualization, VisualizationProps } from './VisualizationView'

const mockBus = {
  self: jest.fn(),
  send: jest.fn()
} as unknown as Bus

function mockVizProps(
  overrides?: Partial<VisualizationProps>
): VisualizationProps {
  return {
    updated: 23,
    maxNeighbours: 200,
    autoComplete: false,
    assignVisElement: () => undefined,
    bus: mockBus,
    isFullscreen: false,
    initialNodeDisplay: 400,
    maxFieldItems: 200,
    result: null,
    graphStyleData: null,
    updateStyle: () => undefined,
    nodePropertiesExpandedByDefault: true,
    setNodePropertiesExpandedByDefault: jest.fn(),
    wheelZoomInfoMessageEnabled: false,
    disableWheelZoomInfoMessage: jest.fn(),
    ...overrides
  }
}
const mockStore = configureMockStore()
const store = mockStore({
  frames: {},
  settings: {}
})

function renderWithRedux(children: JSX.Element) {
  return render(<Provider store={store}>{children}</Provider>)
}
const mockEmptyResult = {
  records: []
}

test('Visualization renders empty content', () => {
  const { container } = renderWithRedux(
    <Visualization {...mockVizProps({ result: mockEmptyResult })} />
  )
  expect(container).toMatchSnapshot()
})
