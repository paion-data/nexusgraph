// Copyright 2023 Paion Data. All rights reserved.
import semver from 'semver'

export const guessSemverVersion = (versionString: string | null) => {
  if (!versionString) {
    return null
  }
  if (semver.valid(versionString)) {
    return versionString
  }

  const coerceVersion = semver.coerce(versionString)
  if (coerceVersion && coerceVersion.version) {
    return coerceVersion.version
  }

  // Could not get a version from the string
  return null
}
