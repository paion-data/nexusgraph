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
