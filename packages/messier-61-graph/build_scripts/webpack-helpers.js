// Copyright 2023 Paion Data. All rights reserved.
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'
exports.nodeEnv = nodeEnv
exports.isProduction = nodeEnv === 'production'

exports.buildPath = path.join(__dirname, '../dist')
exports.assetsPath = path.join(__dirname, '../dist/assets')
exports.browserPath = path.join(__dirname, '../src/browser')
exports.sourcePath = path.join(__dirname, '../src')
exports.projectPath = path.join(__dirname, '../')
