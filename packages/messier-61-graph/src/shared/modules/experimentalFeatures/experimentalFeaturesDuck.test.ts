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
import { APP_START } from '../app/appDuck'
import reducer, {
  NAME,
  disableExperimentalFeature,
  enableExperimentalFeature,
  experimentalFeatureSelfName,
  getExperimentalFeatures,
  initialState,
  showFeature
} from './experimentalFeaturesDuck'
import { dehydrate } from 'services/duckUtils'

describe('experimentalFeatures reducer', () => {
  test('handles initial value', () => {
    const nextState = dehydrate(reducer(undefined, { type: '' }))
    expect(nextState[experimentalFeatureSelfName].on).toEqual(true)
  })

  test('handles FEATURE_ON without initial state', () => {
    const action = enableExperimentalFeature(experimentalFeatureSelfName)
    const nextState = reducer(undefined, action)
    expect(nextState[experimentalFeatureSelfName].on).toEqual(true)
  })
  test('handles FEATURE_ON with initial state', () => {
    const action = enableExperimentalFeature(experimentalFeatureSelfName)
    const nextState = reducer(
      { [experimentalFeatureSelfName]: { on: false } as any },
      action
    )
    expect(nextState[experimentalFeatureSelfName].on).toEqual(true)
  })
  test('handles FEATURE_OFF with initial state', () => {
    const action = disableExperimentalFeature(experimentalFeatureSelfName)
    const nextState = reducer(
      { [experimentalFeatureSelfName]: { on: true } as any },
      action
    )
    expect(nextState[experimentalFeatureSelfName].on).toEqual(false)
  })
  test('stips non existing features from state on initialization', () => {
    // Given
    const action = {
      type: APP_START
    }
    const stateFromLocalStorage: any = {
      nonExistingFeature: {
        on: true
      },
      [experimentalFeatureSelfName]: {
        on: false
      }
    }
    const expectedState = {
      ...initialState,
      [experimentalFeatureSelfName]: {
        ...initialState[experimentalFeatureSelfName],
        on: false
      }
    }

    // When
    const nextState = reducer(stateFromLocalStorage, action)

    // Then
    expect(nextState).toEqual(expectedState)
  })
})

describe('Selectors', () => {
  test('getExperimentalFeatures returns all features', () => {
    // Given
    const action = enableExperimentalFeature(experimentalFeatureSelfName)

    // When
    const nextState = reducer(
      {
        ...initialState,
        [experimentalFeatureSelfName]: {
          ...initialState[experimentalFeatureSelfName],
          on: false
        }
      },
      action
    )
    const combinedState = { [NAME]: nextState }
    const shouldBeAll = getExperimentalFeatures(combinedState)

    // Then
    expect(shouldBeAll).toEqual(initialState)
  })
  test('showFeature returns a features "on" state', () => {
    // Given
    const action = enableExperimentalFeature(experimentalFeatureSelfName)

    // When
    const nextState = reducer(
      {
        ...initialState,
        [experimentalFeatureSelfName]: {
          ...initialState[experimentalFeatureSelfName],
          on: false
        }
      },
      action
    )
    const combinedState = { [NAME]: nextState }
    const shouldBeAll = showFeature(combinedState, experimentalFeatureSelfName)

    // Then
    expect(shouldBeAll).toEqual(true)
  })
})
