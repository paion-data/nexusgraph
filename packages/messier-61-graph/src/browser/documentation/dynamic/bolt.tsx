// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'Bolt'
const subtitle = 'Using Bolt in Neo4j Browser'
const category = 'browserUiCommands'
const filter = ['bolt']
const description = (
  <>
    <p>
      By default, Neo4j Browser communicates with the database via Bolt using
      the Neo4j JavaScript Driver. However it is possible to turn off Bolt and
      communicate with the database using HTTP(S) as in older versions of Neo4j
      Browser.
    </p>
  </>
)

export default { title, subtitle, category, content: null, description, filter }
