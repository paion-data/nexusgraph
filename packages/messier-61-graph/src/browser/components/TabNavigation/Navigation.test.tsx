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
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Navigation from './Navigation'

describe('<Navigation />', () => {
  const div = (testid: string) =>
    function TestDiv() {
      return <div data-testid={testid}></div>
    }

  const topNavItems = [
    {
      name: 'DBMS',
      title: 'DBMS',
      icon: div('dbms-icon'),
      content: div('dbms-content')
    },
    {
      name: 'Favorites',
      title: 'Favorites',
      icon: div('favorites-icon'),
      content: div('favorites-icon')
    }
  ]

  const bottomNavItems = [
    {
      name: 'Documents',
      title: 'Help &amp; Resources',
      icon: div('documents-icon'),
      content: div('documents-content'),
      enableCannyBadge: true
    }
  ]

  // recreation of reducer logic
  const toggleDrawer = (current: string | null, clicked: string) =>
    clicked && clicked !== current ? clicked : null

  it('should open drawer when button is clicked on closed drawer', () => {
    let selectedDrawerName: string | null = ''
    const onNavClick = (clickedDrawerName: string) => {
      selectedDrawerName = toggleDrawer(selectedDrawerName, clickedDrawerName)
    }

    // render with closed drawer
    const { rerender } = render(
      <Navigation
        onNavClick={onNavClick}
        selectedDrawerName={selectedDrawerName}
        topNavItems={topNavItems}
        bottomNavItems={bottomNavItems}
      />
    )

    // click documents button
    fireEvent.click(screen.getByTestId('documents-icon'))

    // rerender with updated selectedDrawerName value
    rerender(
      <Navigation
        onNavClick={onNavClick}
        selectedDrawerName={selectedDrawerName}
        topNavItems={topNavItems}
        bottomNavItems={bottomNavItems}
      />
    )

    // expect documents drawer to be open
    expect(screen.queryByTestId('documents-content')).toBeTruthy()
  })

  it('should switch drawer when different button is clicked than currently open', () => {
    let selectedDrawerName: string | null = 'documents'
    const onNavClick = (clickedDrawerName: string) => {
      selectedDrawerName = toggleDrawer(selectedDrawerName, clickedDrawerName)
    }

    // render with documents drawer open
    const { rerender } = render(
      <Navigation
        onNavClick={onNavClick}
        selectedDrawerName={selectedDrawerName}
        topNavItems={topNavItems}
        bottomNavItems={bottomNavItems}
      />
    )

    // click DBMS button
    fireEvent.click(screen.getByTestId('dbms-icon'))

    // rerender with updated selectedDrawerName value
    rerender(
      <Navigation
        onNavClick={onNavClick}
        selectedDrawerName={selectedDrawerName}
        topNavItems={topNavItems}
        bottomNavItems={bottomNavItems}
      />
    )

    // expect DBMS drawer to be open
    expect(screen.queryByTestId('dbms-content')).toBeTruthy()
    expect(screen.queryByTestId('documents-content')).toBeNull()
  })
})
