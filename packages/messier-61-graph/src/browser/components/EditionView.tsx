// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { Code } from '../modules/Stream/Queries/styled'

export const EnterpriseOnlyFrame = ({ command }: any) => {
  return (
    <div>
      <p>
        Unable to display <Code>{command}</Code> because the procedures required
        to run this frame are missing. These procedures are usually found in
        Neo4j Enterprise edition.
      </p>
      <p>
        Find out more over at{' '}
        <a href="https://neo4j.com/editions/" target="_blank" rel="noreferrer">
          neo4j.com/editions
        </a>
      </p>
    </div>
  )
}
