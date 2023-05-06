// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'
import { createBus } from 'suber'

import { UserList } from './UserList'
import {
  listRolesQuery,
  listUsersQuery
} from 'shared/modules/cypher/boltUserHelper'
import { ROUTED_CYPHER_WRITE_REQUEST } from 'shared/modules/cypher/cypherDuck'

// Stubbing out components dependant on the store
jest.mock('browser/modules/Frame/FrameTitlebar', () => () => null)
jest.mock('browser/modules/Frame/FrameEditor', () => () => null)

describe('<UserList />', () => {
  it('should list users and user roles when enterprise edition is mounted', () => {
    const bus = createBus()
    const useSystemDb = true
    const props = {
      bus,
      frame: {},
      isEnterpriseEdition: true,
      useSystemDb
    }

    const busCallback = jest.fn()
    bus.take(ROUTED_CYPHER_WRITE_REQUEST, busCallback)

    render(<UserList {...props} />)

    expect(busCallback).toHaveBeenCalledTimes(2)
    expect(busCallback).toHaveBeenCalledWith(
      expect.objectContaining({ query: listRolesQuery(useSystemDb) })
    )
    expect(busCallback).toHaveBeenCalledWith(
      expect.objectContaining({ query: listUsersQuery(useSystemDb) })
    )
  })

  it('should not list users or user roles when non enterprise edition is mounted', () => {
    const bus = createBus()
    const useSystemDb = true
    const props = {
      bus,
      frame: {},
      isEnterpriseEdition: false,
      useSystemDb
    }

    const busCallback = jest.fn()
    bus.take(ROUTED_CYPHER_WRITE_REQUEST, busCallback)

    render(<UserList {...props} />)

    expect(busCallback).toHaveBeenCalledTimes(0)
  })
})
