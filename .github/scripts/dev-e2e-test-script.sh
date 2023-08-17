#!/bin/bash

# Copyright 2023 Paion Data. All rights reserved.

yarn start &
yarn wait-on-dev
yarn e2e -- --spec "cypress/e2e/$SPEC_FILE_NAME"
