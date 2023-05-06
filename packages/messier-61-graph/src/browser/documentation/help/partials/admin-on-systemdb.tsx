// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

export default function AdminOnSystemDb() {
  return (
    <p>
      <strong>A note on system database</strong>
      <br />
      Neo4j has a complex security model stored in the system graph, maintained
      in a special database called the <code>system</code> database. All
      administrative commands need to be executed against the{' '}
      <code>system</code> database.
    </p>
  )
}
