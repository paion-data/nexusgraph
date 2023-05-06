// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from 'react'

import useDetectColorScheme from './useDetectColorScheme'

export default function useAutoTheme(defaultTheme = 'light') {
  const detectedScheme = useDetectColorScheme()
  const [autoTheme, setAutoTheme] = useState(detectedScheme || defaultTheme)
  const [overriddenTheme, overrideAutoTheme] = useState<string | null>(null)

  useEffect(() => {
    if (overriddenTheme) {
      setAutoTheme(overriddenTheme)
      return
    }
    if (!detectedScheme && !overriddenTheme) {
      setAutoTheme(defaultTheme)
      return
    }
    setAutoTheme(detectedScheme as string)
  }, [detectedScheme, overriddenTheme])
  return [autoTheme, overrideAutoTheme]
}
