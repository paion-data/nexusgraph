/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
"use strict";

const configFactory = require("../config/webpack/webpack.config");
const devServerConfig = require("../config/webpack/webpackDevServer.config");

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = configFactory("development");

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...devServerConfig(), open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log("Starting server on http://localhost:3000");
});
