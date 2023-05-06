// Copyright 2023 Paion Data. All rights reserved.
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
