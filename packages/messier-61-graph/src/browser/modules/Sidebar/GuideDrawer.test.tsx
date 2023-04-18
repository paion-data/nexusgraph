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
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'

import { GuideDrawer, GuideDrawerProps } from './GuideDrawer'
import { Guide } from 'browser/documentation'
import { RemoteGuide } from 'shared/modules/guides/guidesDuck'

const createProps = (
  currentGuide: Guide | null,
  remoteGuides: RemoteGuide[]
): GuideDrawerProps => ({
  currentGuide: currentGuide,
  remoteGuides: remoteGuides,
  backToAllGuides: () => undefined,
  gotoSlide: () => undefined,
  setCurrentGuide: () => undefined,
  fetchRemoteGuide: () => undefined,
  updateRemoteGuides: () => undefined
})

const mockStore = configureMockStore()

const renderWithRedux = (
  store: MockStoreEnhanced<unknown>,
  children: JSX.Element
) => {
  return render(<Provider store={store}>{children}</Provider>)
}

describe('GuideDrawer', () => {
  const store = mockStore({
    guides: {}
  })

  const remoteGuide: RemoteGuide = {
    currentSlide: 0,
    title: 'Title',
    identifier: 'identifier'
  }

  it('renders list view without Remote Guides', () => {
    const { container } = renderWithRedux(
      store,
      <GuideDrawer {...createProps(null, [])} />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders list view including Remote Guides list', () => {
    const { container } = renderWithRedux(
      store,
      <GuideDrawer {...createProps(null, [remoteGuide])} />
    )

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('remoteGuidesTitle')).not.toBeNull()
    expect(screen.getByText('Title')).not.toBeNull()
  })

  it('renders guide slide when a guide is selected', () => {
    // scrollIntoView is not implemented in jsdom
    // Avoid TypeError: scrollIntoView is not a function
    window.HTMLElement.prototype.scrollIntoView = () => undefined

    const { container } = renderWithRedux(
      store,
      <GuideDrawer
        {...createProps(
          { ...remoteGuide, slides: [<div key={1}>Test Slide</div>] },
          [remoteGuide]
        )}
      />
    )

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Title')).not.toBeNull()
    expect(screen.getByText('Test Slide')).not.toBeNull()
  })
})
