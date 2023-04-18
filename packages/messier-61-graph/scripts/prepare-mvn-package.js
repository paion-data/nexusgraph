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
const path = require('path')
const ncp = require('ncp').ncp

function mkPath(dirPath) {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath)
    } catch (e) {
      mkPath(path.dirname(dirPath))
      mkPath(dirPath)
    }
  }
}

mkPath(path.join(__dirname, '../mvn'))
ncp(path.join(__dirname, '../dist'), path.join(__dirname, '../mvn/browser'))
ncp(
  path.join(__dirname, '../LICENSE'),
  path.join(__dirname, '../mvn/browser/LICENSE')
)
ncp(
  path.join(__dirname, '../LICENSES.txt'),
  path.join(__dirname, '../mvn/browser/LICENSES.txt')
)
ncp(
  path.join(__dirname, '../NOTICE.txt'),
  path.join(__dirname, '../mvn/browser/NOTICE.txt')
)
