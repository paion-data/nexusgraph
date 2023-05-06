// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

export default function ParamsOnSystemDb() {
  return (
    <p>
      <strong>A note on system database</strong>
      <br />
      If you are using a multi-database DBMS, parameters cannot be declared when
      using the system database. Switch to a different database and declare,
      then switch back to system database and use them.
    </p>
  )
}
