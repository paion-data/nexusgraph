// Copyright 2023 Paion Data. All rights reserved.
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
