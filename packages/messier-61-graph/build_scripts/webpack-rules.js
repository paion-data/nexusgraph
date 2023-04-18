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
const helpers = require('./webpack-helpers')
const path = require('path')
const createStyledComponentsTransformer =
  require('typescript-plugin-styled-components').default
const styledComponentsTransformer = createStyledComponentsTransformer()

const tsLoaderOptions = {
  transpileOnly: true,
  getCustomTransformers: () => ({
    before: [...(helpers.isProduction ? [] : [styledComponentsTransformer])]
  })
}

module.exports = [
  {
    test: /\.(ts|tsx)?$/,
    use: {
      loader: 'ts-loader',
      options: tsLoaderOptions
    },
    include: [path.resolve('src')],
    exclude: /node_modules/
  },
  {
    test: /\.(js|jsx)$/,
    include: [
      path.resolve('src'),
      path.resolve('node_modules/@neo4j/browser-lambda-parser')
    ],
    use: 'babel-loader'
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: [path.resolve(helpers.browserPath, 'modules')],
    use: 'file-loader?limit=20480&name=assets/[name]-[hash].[ext]'
  },
  {
    test: /\.woff$/,
    use: 'file-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.woff2$/,
    use: 'file-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.[ot]tf$/,
    use: 'file-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.eot$/,
    use: 'file-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.less$/, // Carousel
    include: path.resolve(helpers.browserPath, 'modules/Carousel'),
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          camelCase: true,
          localIdentName: '[local]'
        }
      },
      'postcss-loader'
    ]
  },
  {
    test: /\.css$/,
    include: path.resolve(helpers.sourcePath), // css modules for component css files
    exclude: [
      path.resolve(helpers.browserPath, 'styles'),
      path.resolve(helpers.browserPath, 'modules/Carousel')
    ],
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          camelCase: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss-loader'
    ]
  },
  {
    test: /\.css$/, // global css files that don't need any processing
    exclude: [
      path.resolve(helpers.browserPath, 'components'),
      path.resolve(helpers.browserPath, 'modules')
    ],
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.svg$/,
    use: 'file-loader?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]',
    exclude: [path.resolve(helpers.browserPath, 'components/icons/svgs')]
  },
  {
    test: /\.svg$/,
    loader: 'raw-loader',
    include: [path.resolve(helpers.browserPath, 'components/icons/svgs')]
  },
  {
    test: /\.html?$/,
    use: ['html-loader']
  },
  {
    test: /boltWorker\.ts/,
    use: [
      {
        loader: 'worker-loader',
        options: {
          name: 'bolt-worker-[hash].js'
        }
      },
      {
        loader: 'ts-loader',
        options: tsLoaderOptions
      }
    ]
  }
]
