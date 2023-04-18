/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
