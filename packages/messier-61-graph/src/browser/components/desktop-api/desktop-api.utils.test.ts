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
import {
  createConnectionCredentialsObject,
  eventToHandler,
  getActiveGraph
} from './desktop-api.utils'
import { KERBEROS, NATIVE } from 'services/bolt/boltHelpers'

describe('getActiveGraph', () => {
  const graphs = [
    null,
    'string',
    undefined,
    [1],
    { project: null },
    { projects: { x: 1 } },
    { projects: [{ x: 1 }] },
    { projects: [{ graphs: [{ status: 'NOPE' }] }] }
  ]

  // When && Then
  test.each(graphs)('getActiveGraph handles %o as projects', (graph: any) => {
    expect(getActiveGraph(graph)).toEqual(null)
  })

  test('getActiveGraph handles expected objects', () => {
    // Given
    const graph = {
      status: 'ACTIVE'
    }
    const graph2 = {
      status: 'INACTIVE'
    }
    const apiResponse = {
      projects: [
        {
          graphs: [graph, graph2]
        }
      ]
    }

    // When
    const activeGraph = getActiveGraph(apiResponse)

    // Then
    expect(activeGraph).toEqual(graph)
  })
})

describe('eventToHandler', () => {
  const tests: [any, any][] = [
    [undefined, null],
    [true, null],
    ['XXX', 'onXxx'],
    ['_XXX', 'onXxx'],
    ['XXX_YYY', 'onXxxYyy'],
    ['XXX_YYY_ZZZ', 'onXxxYyyZzz'],
    ['xxx', 'onXxx'],
    ['xxx_yyy', 'onXxxYyy'],
    ['XXX_123', 'onXxx123'],
    ['0', 'on0'],
    ['1', 'on1'],
    [1, null]
  ]

  // When && Then
  test.each(tests)('handles event of type %s', (type, expected) => {
    expect(eventToHandler(type)).toEqual(expected)
  })
})

describe('createConnectionCredentialsObject', () => {
  test('it creates an expected object from context, and adds kerberos ticket as password', async () => {
    // Given
    const kerberosTicket = 'kerberos-ticket-test'
    const activeConnectionData = createApiResponse(
      generateActiveGraph({ enc: 'REQUIRED', kerberos: true })
    )
    const activeGraph = getActiveGraph(activeConnectionData)
    const getKerberosTicket = jest.fn(() => kerberosTicket)
    const connectionData = await createConnectionCredentialsObject(
      activeGraph,
      {},
      getKerberosTicket
    )
    expect(connectionData).toEqual({
      username: 'one',
      password: kerberosTicket,
      url: 'bolt:port',
      tlsLevel: 'REQUIRED',
      encrypted: true,
      host: 'bolt:port',
      restApi: 'http://foo:bar',
      authenticationMethod: KERBEROS
    })
    expect(getKerberosTicket).toHaveBeenCalledTimes(1)
    expect(getKerberosTicket).toHaveBeenCalledWith('https')
  })
  test('it creates an expected object from context, without kerberos', async () => {
    // Given
    const kerberosTicket = 'kerberos-ticket-test'
    const getKerberosTicket = jest.fn(() => kerberosTicket)
    const activeConnectionData = createApiResponse(
      generateActiveGraph({ enc: 'REQUIRED', kerberos: false })
    )
    const activeGraph = getActiveGraph(activeConnectionData)
    const connectionData = await createConnectionCredentialsObject(
      activeGraph,
      {},
      getKerberosTicket
    )
    expect(connectionData).toEqual({
      username: 'one',
      password: 'one1',
      url: 'bolt:port',
      tlsLevel: 'REQUIRED',
      encrypted: true,
      host: 'bolt:port',
      restApi: 'http://foo:bar',
      authenticationMethod: NATIVE
    })
    expect(getKerberosTicket).toHaveBeenCalledTimes(0)
  })
})

const bolt = (enc = 'OPTIONAL') => ({
  username: 'one',
  password: 'one1',
  url: 'bolt:port',
  tlsLevel: enc
})
const http = {
  host: 'foo',
  port: 'bar'
}

const https = {
  host: 'abc',
  port: 'xyz'
}
const createApiResponse = (graphs: any) => ({
  projects: [{ graphs }]
})

const generateActiveGraph = (props = { enc: 'OPTIONAL', kerberos: false }) => [
  {
    id: 1,
    status: 'ACTIVE',
    connection: {
      configuration: {
        protocols: { bolt: bolt(props.enc), http, https },
        authenticationMethods: {
          kerberos: {
            enabled: props.kerberos,
            servicePrincipal: 'https'
          }
        }
      }
    }
  }
]
