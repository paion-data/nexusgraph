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

const js2xmlparser = require('js2xmlparser')
const externalDependencies = require('./static_data/external_dependencies')

process.stdin.setEncoding('utf8')

let data = ''

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    data += chunk
  }
})

process.stdin.on('end', () => {
  const packagesList = parseJson(data)

  process.stdout.write(packagesList)
  process.exit(1)
})

function buildDependencyObject(id, name, license) {
  const tempObj = { '@': { id: '', name: '' }, license: '' }
  tempObj['@'].id = id
  tempObj['@'].name = name
  tempObj.license = license

  return tempObj
}

function parseJson(data) {
  const parsedObj = JSON.parse(data).data.body

  const resArr = [
    ...externalDependencies.map(dep =>
      buildDependencyObject(dep[0], dep[1], dep[2])
    ),
    ...parsedObj.map(dep => buildDependencyObject(dep[0], dep[0], dep[2]))
  ]

  const res = {
    'missing-artifacts': {
      artifact: resArr
    }
  }

  const js2xmlparseOptions = {
    declaration: { include: false },
    format: { indent: '  ', doubleQuotes: true }
  }

  return js2xmlparser.parse('licensing-requirements', res, js2xmlparseOptions)
}
