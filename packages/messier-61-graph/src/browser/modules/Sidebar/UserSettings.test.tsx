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
