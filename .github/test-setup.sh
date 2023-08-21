#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

cd packages/nexusgraph-server
yarn install
yarn start ../../.github/db.json &
yarn wait-on-server
cd ../../
