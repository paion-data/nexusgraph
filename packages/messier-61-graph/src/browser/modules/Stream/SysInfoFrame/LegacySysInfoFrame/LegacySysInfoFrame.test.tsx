// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import { LegacySysInfoFrame } from './LegacySysInfoFrame'
import reducers from 'project-root/src/shared/rootReducer'

const baseProps = {
  bus: null as any,
  frame: null as any,
  isFullscreen: false,
  isCollapsed: false,
  isOnCluster: false
}

describe('LegacySysInfoFrame', () => {
  test('should display error when there is no connection', () => {
    // Given
    const props = { ...baseProps, isConnected: false }

    // When
    const reducer = combineReducers({ ...(reducers as any) })
    const store: any = createStore(reducer)
    const { getAllByText } = render(
      <Provider store={store}>
        <LegacySysInfoFrame {...props} />
      </Provider>
    )

    // Then
    expect(getAllByText(/No connection available/i)).not.toBeNull()
  })
})
