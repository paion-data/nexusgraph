// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from 'react'

import useAutoTheme from './useAutoTheme'
import { AUTO_THEME, LIGHT_THEME } from 'shared/modules/settings/settingsDuck'

export default function useDerivedTheme(
  selectedTheme: any,
  defaultTheme = LIGHT_THEME
) {
  const [derivedTheme, overrideAutoTheme]: any[] = useAutoTheme(defaultTheme)
  const [environmentTheme, setEnvironmentTheme] = useState(null)

  useEffect(() => {
    if (environmentTheme && selectedTheme === AUTO_THEME) {
      overrideAutoTheme(environmentTheme)
      return
    }
    if (selectedTheme !== AUTO_THEME) {
      overrideAutoTheme(selectedTheme)
    } else {
      overrideAutoTheme(null)
    }
  }, [selectedTheme, environmentTheme])
  return [derivedTheme, setEnvironmentTheme]
}
