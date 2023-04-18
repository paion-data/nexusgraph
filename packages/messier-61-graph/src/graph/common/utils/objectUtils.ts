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
export const deepEquals = (x: any, y: any): boolean => {
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    if (Object.keys(x).length !== Object.keys(y).length) return false
    return Object.keys(x).every(key => deepEquals(x[key], y[key]))
  }
  if (typeof x === 'function' && typeof y === 'function') {
    return x.toString() === y.toString()
  }
  return x === y
}
export function mapObjectValues<A, B>(
  object: Record<string, A>,
  mapper: (val: A) => B
): Record<string, B> {
  return Object.entries(object).reduce(
    (res: Record<string, B>, [currKey, currVal]) => {
      res[currKey] = mapper(currVal)
      return res
    },
    {}
  )
}

export function keys<T>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>
}
