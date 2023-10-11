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
// eslint-disable-next-line no-restricted-imports
import { Provider } from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import { combineReducers, createStore } from 'redux'

import { GrassEditor } from './GrassEditor'
// eslint-disable-next-line no-restricted-imports
import reducers from 'shared/rootReducer'

describe('<GrassEditor />', () => {
  it('loads style rules on style option click', () => {
    const reducer = combineReducers({ ...(reducers as any) })
    const store: any = createStore(reducer)
    const { container } = render(
      <Provider store={store}>
        <GrassEditor
          selectedLabel={{
            label: 'foo',
            propertyKeys: []
          }}
        />
      </Provider>
    )

    const largestSizeOption = container.querySelector(
      '[data-testid="size-picker"] li:last-of-type a'
    ) as HTMLElement

    // Click style option to trigger redux action resulting in new graphStyleData
    largestSizeOption.click()

    // Expect clicked size option to be active
    expect(largestSizeOption.classList.contains('active')).toBe(true)
  })
})
