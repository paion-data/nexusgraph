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
import { act, render } from '@testing-library/react'
import React from 'react'

import useDerivedTheme from './useDerivedTheme'
import {
  AUTO_THEME,
  DARK_THEME,
  LIGHT_THEME,
  OUTLINE_THEME
} from 'shared/modules/settings/settingsDuck'

describe('useDerivedTheme', () => {
  it('uses light as default theme if no default is passed in', () => {
    let resolvedTheme

    const Comp = () => {
      const [theme] = useDerivedTheme(undefined)
      resolvedTheme = theme
      return null
    }

    // When
    render(<Comp />)

    // Then
    expect(resolvedTheme).toEqual(LIGHT_THEME) // Default
  })
  it('uses default theme if no can be detected + it can be overridden when user has AUTO theme selected', () => {
    let resolvedTheme
    let overrideThemeFn: any

    const Comp = ({ selectedTheme, defaultTheme }: any) => {
      const [derivedTheme, setEnvTheme] = useDerivedTheme(
        selectedTheme,
        defaultTheme
      )
      resolvedTheme = derivedTheme
      overrideThemeFn = setEnvTheme
      return null
    }

    // When
    const { rerender } = render(
      <Comp defaultTheme={LIGHT_THEME} selectedTheme={AUTO_THEME} />
    )

    // Then
    expect(resolvedTheme).toEqual(LIGHT_THEME) // Default

    // When
    act(() => overrideThemeFn(OUTLINE_THEME)) // Override

    // Then
    expect(resolvedTheme).toEqual(OUTLINE_THEME)

    // When user switches off AUTO theme and selects dark
    rerender(<Comp defaultTheme={LIGHT_THEME} selectedTheme={DARK_THEME} />)

    // Then
    expect(resolvedTheme).toEqual(DARK_THEME)

    // When switching back and resetting env theme
    rerender(<Comp defaultTheme={LIGHT_THEME} selectedTheme={AUTO_THEME} />)
    act(() => overrideThemeFn(null)) // Override

    // Then
    expect(resolvedTheme).toEqual(LIGHT_THEME)
  })
})
