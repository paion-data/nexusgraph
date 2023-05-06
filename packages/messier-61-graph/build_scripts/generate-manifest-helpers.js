// Copyright 2023 Paion Data. All rights reserved.
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
