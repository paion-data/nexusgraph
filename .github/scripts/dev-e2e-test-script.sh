#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

cd packages/nexusgraph-server
yarn install
yarn start ../../.github/dbInDev.json &
yarn wait-on-server
cd ../../

yarn start &
yarn wait-on-dev
yarn e2e --spec "$SPEC_FILE_PATH"
