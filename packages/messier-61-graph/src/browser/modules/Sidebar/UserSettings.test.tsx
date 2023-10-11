// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { UserSettings } from './UserSettings'

test('Settings renders with strange characters in display name', () => {
  // Given
  const settings = { testSetting: true }
  const visualSettings = [
    {
      title: 'Test åäö settings',
      settings: [
        {
          testSetting: {
            displayName: 'åäö üüü'
          }
        }
      ]
    }
  ]

  // When
  const { container } = render(
    <UserSettings
      settings={settings}
      visualSettings={visualSettings}
      telemetrySettings={{
        allowUserStats: false,
        allowCrashReporting: false,
        source: 'BROWSER_SETTING'
      }}
    />
  )

  // Then
  expect(container).toMatchSnapshot()
})
