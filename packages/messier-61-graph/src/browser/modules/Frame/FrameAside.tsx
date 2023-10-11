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
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Lead } from 'browser-components/Text'
import { H3 } from 'browser-components/headers'
import { DARK_THEME } from 'shared/modules/settings/settingsDuck'

function FrameAside(props: any) {
  const theme = useContext(ThemeContext)
  const { subtitle } = props
  let { title } = props

  // Use logo as title if title is only Neo4j
  if (title === 'Neo4j') {
    const isDarkTheme = theme.name === DARK_THEME
    title = (
      <img
        src={`./assets/images/neo4j-logo${isDarkTheme ? '-inverted' : ''}.svg`}
        alt="Neo4j"
        className="frame-title-logo"
      />
    )
  }

  return title ? (
    <>
      {title && <H3>{title}</H3>}
      {subtitle && <Lead>{subtitle}</Lead>}
    </>
  ) : null
}

export default FrameAside
