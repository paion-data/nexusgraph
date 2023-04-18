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
