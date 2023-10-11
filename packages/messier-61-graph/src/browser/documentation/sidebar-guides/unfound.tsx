// Copyright 2023 Paion Data. All rights reserved.
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
