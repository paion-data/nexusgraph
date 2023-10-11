#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

yarn build
npm install -g serve
serve -s dist -l 8080 &
yarn wait-on-prod
yarn e2e --spec "$SPEC_FILE_PATH"
