// Copyright 2023 Paion Data. All rights reserved.
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
