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
export const upperFirst = (str: string): string =>
  str[0].toUpperCase() + str.slice(1)

export const toKeyString = (str: any) => btoa(encodeURIComponent(str))

export const numberToUSLocale = (
  value: null | undefined | number | string
): string | null => {
  if (value === null || value === undefined) {
    return null
  }

  const n = typeof value === 'number' ? value : parseInt(value, 10)
  if (isNaN(n)) {
    return n.toString()
  }

  return n.toLocaleString('en-US')
}
