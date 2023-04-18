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
const getPlugins = require('./webpack-plugins')
const rules = require('./webpack-rules')
const helpers = require('./webpack-helpers')

module.exports = {
  mode: helpers.isProduction ? 'production' : 'development',
  node: {
    fs: 'empty'
  },
  entry: [path.resolve(helpers.browserPath, 'index.tsx')],
  output: {
    filename: 'app-[hash].js',
    chunkFilename: '[name]-[hash].bundle.js',
    publicPath: '',
    path: helpers.buildPath,
    globalObject: 'this'
  },
  plugins: getPlugins(),
  resolve: {
    symlinks: false,
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'project-root': path.resolve(__dirname, '../'),
      services: path.resolve(helpers.sourcePath, 'shared/services'),
      'browser-services': path.resolve(helpers.browserPath, 'services'),
      shared: path.resolve(helpers.sourcePath, 'shared'),
      'browser-components': path.resolve(helpers.browserPath, 'components'),
      'browser-hooks': path.resolve(helpers.browserPath, 'hooks'),
      browser: path.resolve(helpers.browserPath),
      'browser-styles': path.resolve(helpers.browserPath, 'styles'),
      'neo4j-arc/graph-visualization$': path.resolve(
        helpers.sourcePath,
        'neo4j-arc/graph-visualization'
      ),
      'neo4j-arc/common$': path.resolve(helpers.sourcePath, 'neo4j-arc/common'),
      'neo4j-arc/cypher-language-support$': path.resolve(
        helpers.sourcePath,
        'neo4j-arc/cypher-language-support'
      )
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules
  },
  optimization: helpers.isProduction
    ? {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|@firebase|d3)[\\/]/,
              name: 'vendor',
              chunks: 'all',
              enforce: true
            },
            'cypher-editor': {
              test: /[\\/]node_modules[\\/](antlr4|cypher-editor-support|monaco-editor)[\\/]/,
              name: 'cypher-editor',
              chunks: 'all',
              enforce: true
            },
            'semantic-ui': {
              test: /[\\/]node_modules[\\/](semantic-ui-react)[\\/]/,
              name: 'semantic-ui',
              chunks: 'all',
              enforce: true
            },
            'neo4j-driver': {
              test: /[\\/]node_modules[\\/](text-encoding|neo4j-driver)[\\/]/,
              name: 'neo4j-driver',
              chunks: 'all',
              enforce: true
            }
          }
        }
      }
    : {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
      },
  devtool: helpers.isProduction ? false : 'eval-cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    hot: !helpers.isProduction
  }
}
