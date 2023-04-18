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
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'
exports.nodeEnv = nodeEnv
exports.isProduction = nodeEnv === 'production'

exports.buildPath = path.join(__dirname, '../dist')
exports.assetsPath = path.join(__dirname, '../dist/assets')
exports.browserPath = path.join(__dirname, '../src/browser')
exports.sourcePath = path.join(__dirname, '../src')
exports.projectPath = path.join(__dirname, '../')
