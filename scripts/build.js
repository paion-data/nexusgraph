/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
"use strict";

const Webpack = require("webpack");
const configFactory = require("../config/webpack/webpack.config");
const webpackConfig = configFactory("production");

const compiler = Webpack(webpackConfig);

console.log("Creating an optimized production build...");

compiler.run();
