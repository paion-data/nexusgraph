// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'Query Status'
const subtitle = 'Show query status.'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <a exec-topic="queries">:queries</a> command will list your servers
      and clusters running queries.
      <br />
      From that list you have the ability to kill unwanted queries.
    </p>
  </>
)

export default { title, subtitle, category, content }
