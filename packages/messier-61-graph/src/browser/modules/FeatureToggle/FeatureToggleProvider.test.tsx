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

import { Consumer, FeatureToggleProvider } from './FeatureToggleProvider'

const MyConsumer = () => {
  return (
    <h1>
      <Consumer>
        {(showFeature: any) => {
          return showFeature('testFeature') ? 'Yes' : 'No'
        }}
      </Consumer>
    </h1>
  )
}

describe('FeatureToggleProvider', () => {
  test('exposes "showFeature" in app context and returns the feature state (true)', () => {
    // Given
    const features = {
      testFeature: { on: true },
      anotherFeature: { on: false }
    }
    const { getByText, queryByText } = render(
      <FeatureToggleProvider features={features}>
        <MyConsumer />
      </FeatureToggleProvider>
    )

    // Then
    expect(getByText('Yes')).not.toBeUndefined()
    expect(queryByText('No')).toBeNull()
  })
  test('exposes "showFeature" in app context and returns the feature state (false)', () => {
    // Given
    const features = {
      testFeature: { on: false },
      anotherFeature: { on: true }
    }
    const { getByText, queryByText } = render(
      <FeatureToggleProvider features={features}>
        <MyConsumer />
      </FeatureToggleProvider>
    )

    // Then
    expect(getByText('No')).not.toBeUndefined()
    expect(queryByText('Yes')).toBeNull()
  })
  test('returns true for unknown features', () => {
    // Given
    const features = { anotherFeature: { on: false } }
    const { getByText, queryByText } = render(
      <FeatureToggleProvider features={features}>
        <MyConsumer />
      </FeatureToggleProvider>
    )

    // Then
    expect(getByText('Yes')).not.toBeUndefined()
    expect(queryByText('No')).toBeNull()
  })
})
