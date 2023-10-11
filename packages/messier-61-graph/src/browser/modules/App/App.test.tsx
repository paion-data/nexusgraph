// Copyright 2023 Paion Data. All rights reserved.

/* eslint-disable react/display-name */
import { render } from '@testing-library/react'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import { App } from './App'

const mockStore = configureMockStore()
const store = mockStore({})

jest.mock('../FeatureToggle/FeatureToggleProvider', () => {
  return ({ children }: any) => <div>{children}</div>
})
jest.mock('./PerformanceOverlay.tsx', () => () => <div />)
jest.mock('./styled', () => {
  const orig = jest.requireActual('./styled')
  return {
    ...orig,
    StyledApp: () => <div>Loaded</div>
  }
})

describe('App', () => {
  test('App loads', async () => {
    // Given
    const props = {
      store,
      telemetrySettings: {
        allowUserStats: false,
        allowCrashReporting: false,
        source: 'BROWSER_SETTING'
      }
    }

    // When
    const { getByText } = render(<App {...props} />)

    // Then
    expect(getByText('Loaded'))
  })
})
