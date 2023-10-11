// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'
import { createBus } from 'suber'

import { UserAdd } from './UserAdd'
import { listRolesQuery } from 'shared/modules/cypher/boltUserHelper'
import { ROUTED_CYPHER_WRITE_REQUEST } from 'shared/modules/cypher/cypherDuck'

// Stubbing out components dependant on the store
jest.mock('browser/modules/Frame/FrameTitlebar', () => () => null)
jest.mock('browser/modules/Frame/FrameEditor', () => () => null)

describe('<UserAdd />', () => {
  it('should send a Cypher request to list user roles when mounted', () => {
    const bus = createBus()
    const useSystemDb = true
    const props = {
      bus,
      frame: {},
      isEnterpriseEdition: true,
      useSystemDb
    }

    const busCallback = jest.fn()
    bus.one(ROUTED_CYPHER_WRITE_REQUEST, busCallback)

    render(<UserAdd {...props} />)

    expect(busCallback).toHaveBeenCalledTimes(1)
    expect(busCallback).toHaveBeenCalledWith(
      expect.objectContaining({ query: listRolesQuery(useSystemDb) })
    )
  })
})
