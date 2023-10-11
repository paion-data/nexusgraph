// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

export default function DbsOnSystemDb() {
  return (
    <p>
      <strong>A note on system database</strong>
      <br />
      Neo4j allows the same server to manage multiple databases. The metadata
      for these databases, including the associated security model, is
      maintained in a special database called the <code>system</code> database.
      All multi-database administrative commands need to be executing against
      the <code>system</code> database.
    </p>
  )
}
