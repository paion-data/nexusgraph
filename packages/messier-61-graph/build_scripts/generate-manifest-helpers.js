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
const fs = require('fs')

function loadDataFromFile(file) {
  try {
    const obj = JSON.parse(fs.readFileSync(file, 'utf8'))
    return obj
  } catch (e) {
    throw new Error('Could not load or parse file: ' + file + '. Error: ' + e)
  }
}

function writeDataToFile(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch (e) {
    throw new Error('Could not write to file: ' + file + '. Error: ' + e)
  }
}

function buildTargetObject(data, dataProp) {
  const out = {}
  const keys = data[dataProp] || []
  keys.forEach(key => (out[key] = data[key]))
  return out
}

module.exports = {
  loadDataFromFile,
  writeDataToFile,
  buildTargetObject
}
