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
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const builder = new xml2js.Builder()

// Shallow validation
if (process.argv.length !== 6) failExit()

// Create obj from args
const args = parseArgv(process.argv)
main(args)

function main(args) {
  if (!args['-f'] || !args['-v']) return failExit() // Validate args

  const file = path.join(__dirname, '../', args['-f'])

  fs.readFile(file, function(err, data) {
    if (err) return failExit()
    parser.parseString(data, function(err, result) {
      if (err) return failExit()
      result.project.version = args['-v'] // Set new version in obj
      const xml = builder.buildObject(result) // Create XML
      fs.writeFile(file, xml, function(err) {
        if (err) return failExit()
        console.log('\nDone updating version in pom.xml\n')
        process.exit(0) // All good
      })
    })
  })
}

function parseArgv(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i += 2) {
    // Pairs
    out[argv[i]] = argv[i + 1]
  }
  return out
}

function failExit() {
  console.log(
    'Error. Usage: "node set-pom-version.js -f filepath/from/project/root/pom.xml -v new-version-semver"'
  )
  process.exit(1)
}
