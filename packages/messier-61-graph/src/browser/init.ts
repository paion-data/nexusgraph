// Copyright 2023 Paion Data. All rights reserved.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './styles/bootstrap.grid-only.min.css'
import './styles/streamline.css'
import './styles/neo4j-world.css'
import './styles/font-awesome.min.css'
import './styles/fira-code.css'
import './styles/open-sans.css'
import './styles/util-classes.css'

import 'browser-styles/relate-by-ui/relate-by-PARTS.css'

import '@neo4j-ndl/base/lib/neo4j-ds-styles.css'

// non web env (just for tests)
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return Buffer.from(str, 'binary').toString('base64')
  }
}
