#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

cd packages/nexusgraph-server
yarn install
yarn start ../../.github/dbInProd.json &
yarn wait-on-server
cd ../../

yarn build
npm install -g serve
serve -s dist -l 8080 &
yarn wait-on-prod
yarn e2e --spec "$SPEC_FILE_PATH"
