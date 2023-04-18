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

export function isNullish(x: unknown): x is null | undefined {
  return x === null || x === undefined
}

export function optionalToString(value: any) {
  return !isNullish(value) && typeof value?.toString === 'function'
    ? value.toString()
    : value
}

export const selectorStringToArray = (selector: string) => {
  // Negative lookbehind simulation since js support is very limited.
  // We want to match all . that are not preceded by \\
  // Instead we reverse and look
  // for . that are not followed by \\ (negative lookahead)
  const reverseSelector = selector.split('').reverse().join('')
  const re = /(.+?)(?!\.\\)(?:\.|$)/g
  const out = []
  let m
  while ((m = re.exec(reverseSelector)) !== null) {
    const res = m[1].split('').reverse().join('')
    out.push(res)
  }

  return out
    .filter(r => r)
    .reverse()
    .map(r => r.replace(/\\./g, '.'))
}

export const selectorArrayToString = (selectors: any) => {
  const escaped = selectors.map((r: any) => r.replace(/\./g, '\\.'))
  return escaped.join('.')
}
