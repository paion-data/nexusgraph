// Copyright 2023 Paion Data. All rights reserved.
import { uniqBy } from 'lodash'
import React from 'react'
import styled from 'styled-components'

import {
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import { escapeCypherIdentifier } from 'services/utils'
import { Database } from 'shared/modules/dbMeta/dbMetaDuck'

const Select = styled.select`
  width: 100%;
  height: 30px;
  color: ${props => props.theme.inputText};
`

const EMPTY_OPTION = 'Select db to use'

const HOUSE_EMOJI = '\u{1F3E0}'
const HOUR_GLASS_EMOJI = '\u{231B}'
const NBSP_CHAR = '\u{00A0}'

type DatabaseSelectorProps = {
  databases?: Database[]
  selectedDb: string
  onChange?: (dbName: string) => void
}
export const DatabaseSelector = ({
  databases = [],
  selectedDb,
  onChange = () => undefined
}: DatabaseSelectorProps): JSX.Element | null => {
  if (databases.length === 0) {
    return null
  }
  const selectionChange = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (target.value !== EMPTY_OPTION) {
      onChange(escapeCypherIdentifier(target.value))
    }
  }

  // When connected to a cluster, we get duplicate dbs for each member
  const uniqDatabases = uniqBy(databases, 'name')

  const homeDb =
    uniqDatabases.find(db => db.home) || uniqDatabases.find(db => db.default)

  const aliasList = uniqDatabases.flatMap(db =>
    db.aliases
      ? db.aliases.map(alias => ({
          databaseName: db.name,
          name: alias,
          status: db.status
        }))
      : []
  )

  const databasesAndAliases = [...aliasList, ...uniqDatabases].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <DrawerSection>
      <DrawerSubHeader>Use database</DrawerSubHeader>
      <DrawerSectionBody>
        <Select
          value={selectedDb}
          data-testid="database-selection-list"
          onChange={selectionChange}
        >
          {!Boolean(selectedDb) && (
            <option value={EMPTY_OPTION}>{EMPTY_OPTION}</option>
          )}

          {databasesAndAliases.map(dbOrAlias => (
            <option
              key={dbOrAlias.name}
              value={dbOrAlias.name}
              disabled={dbOrAlias.status === 'unknown'}
            >
              {dbOrAlias.name}
              {dbOrAlias === homeDb ? NBSP_CHAR + HOUSE_EMOJI : ''}
              {dbOrAlias.status === 'unknown'
                ? NBSP_CHAR + HOUR_GLASS_EMOJI
                : ''}
            </option>
          ))}
        </Select>
      </DrawerSectionBody>
    </DrawerSection>
  )
}
