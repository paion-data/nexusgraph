#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

echo "SPEC_FILE_PATH=$SPEC_FILE_PATH"

yarn start &
yarn wait-on-dev
yarn e2e -- --spec "$SPEC_FILE_PATH"
