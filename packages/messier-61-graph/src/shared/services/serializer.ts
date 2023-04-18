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

const csvDelimiter = ','
const csvNewline = '\n'

const csvEscape = (str: any) => {
  if (!isString(str)) return str
  if (isEmptyString(str)) return '""'
  if (hasQuotes(str) || hasDelimiterChars(str) || hasNewLines(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}
const serializeObject = (input: any) =>
  isObject(input) ? JSON.stringify(input) : input

const hasDelimiterChars = (str: any) => str && str.indexOf(csvDelimiter) > -1
const hasNewLines = (str: any) => str && str.indexOf(csvNewline) > -1
const hasQuotes = (str: any) => str && str.indexOf('"') > -1
const isString = (str: any) => typeof str === 'string'
const isObject = (str: any) => typeof str === 'object' && str !== null
const isEmpty = (str: any) => typeof str === 'undefined' || str === null
const isEmptyString = (str: any) => str === ''

const csvChain = (input: any) =>
  (Array.isArray(input) ? input : [])
    .map(serializeObject)
    .map(csvEscape)
    .join(csvDelimiter)

export const CSVSerializer = (cols: any) => {
  const _cols = cols
  const _data: any = []
  const append = (row?: any) => {
    const emptyRowInOneCol = isEmpty(row) && _cols.length === 1
    if (emptyRowInOneCol) return _data.push(row)
    if (!row || row.length !== _cols.length) {
      throw new Error('Column number mismatch')
    }
    _data.push(row)
  }
  return {
    append,
    appendRows: (rows: any) => rows.forEach(append),
    output: () =>
      csvChain(_cols) +
      (!_data.length ? '' : csvNewline + _data.map(csvChain).join(csvNewline))
  }
}
