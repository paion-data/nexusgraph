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
import React from 'react'

import { BuiltInGuideSidebarSlide } from 'browser/modules/Carousel/Slide'

const title = 'Not found'
const identifier = 'unfound'
const slides = [
  <BuiltInGuideSidebarSlide key="first">
    <p>{`Apologies, but there doesn't seem to be any content about that.`}</p>
    <h5>Try:</h5>
    <ul className="undecorated">
      <li>
        <a data-exec="help">:help</a> - for general help about using Neo4j
        Browser
      </li>
      <li>
        <a data-exec="guide intro">:guide intro</a> - to see a few available
        guides
      </li>
      <li>
        <a href="https://neo4j.com/docs/">Neo4j Documentation</a> - for detailed
        information about Neo4j
      </li>
    </ul>
  </BuiltInGuideSidebarSlide>
]

export default { title, slides, identifier, isError: true }
