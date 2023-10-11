// Copyright 2023 Paion Data. All rights reserved.

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
