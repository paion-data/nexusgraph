// Copyright 2023 Paion Data. All rights reserved.
import semver from 'semver'

export const formatDocVersion = (v: string | null = ''): string => {
  if (!v || !semver.valid(v)) {
    // All non-strings return
    return 'current'
  }
  if (semver.prerelease(v)) {
    return `${semver.major(v)}.${semver.minor(v)}-preview`
  }
  return `${semver.major(v)}.${semver.minor(v)}` || 'current'
}
