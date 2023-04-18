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
