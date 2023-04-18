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
import { KERBEROS, NATIVE } from 'services/bolt/boltHelpers'
import { upperFirst } from 'neo4j-arc/common'

const notEmpty = (str: any) => str.length > 0
const splitOnUnderscore = (str: any) => str.split('_')
const toLower = (str: any) => str.toLowerCase()

// XXX_YYY -> onXxxYyy
export const eventToHandler = (type: any) => {
  if (typeof type !== 'string') return null
  return `on${splitOnUnderscore(type)
    .filter(notEmpty)
    .map(toLower)
    .map(upperFirst)
    .join('')}`
}

export const getActiveGraph = (context: any = {}) => {
  if (!context) return null
  const { projects } = context
  if (!Array.isArray(projects)) return null
  const activeProject = projects.find(project => {
    if (!project) return false
    if (!(project.graphs && Array.isArray(project.graphs))) return false
    return project.graphs.find(({ status }: any) => status === 'ACTIVE')
  })
  if (!activeProject) return null
  return activeProject.graphs.find(({ status }: any) => status === 'ACTIVE')
}

const getCredentialsForGraph = (protocol: any, graph: any = null) => {
  if (!graph || !graph.connection) return null
  const { configuration = null } = graph.connection
  if (!configuration) {
    return null
  }
  if (!configuration.protocols) {
    return null
  }
  if (typeof configuration.protocols[protocol] === 'undefined') {
    return null
  }
  return configuration.protocols[protocol]
}

export async function createConnectionCredentialsObject(
  activeGraph: any,
  existingData: any,
  getKerberosTicket = (_: any) => {}
) {
  const creds = getCredentialsForGraph('bolt', activeGraph)
  if (!creds) return // No connection. Ignore and let browser show connection lost msgs.
  const httpsCreds = getCredentialsForGraph('https', activeGraph)
  const httpCreds = getCredentialsForGraph('http', activeGraph)
  const kerberos = isKerberosEnabled(activeGraph)
  if (kerberos !== false) {
    creds.password = await getKerberosTicket(kerberos.servicePrincipal)
  }
  const restApi =
    httpsCreds && httpsCreds.enabled
      ? `https://${httpsCreds.host}:${httpsCreds.port}`
      : `http://${httpCreds.host}:${httpCreds.port}`
  const connectionCreds = {
    // Use current connections creds until we get new from API
    ...existingData,
    ...creds,
    encrypted: creds.tlsLevel === 'REQUIRED',
    host: creds.url || `bolt://${creds.host}:${creds.port}`,
    restApi,
    authenticationMethod: kerberos ? KERBEROS : NATIVE
  }
  return connectionCreds
}

const isKerberosEnabled = (activeGraph: any) => {
  if (!activeGraph || typeof activeGraph.connection === 'undefined') {
    return false
  }
  if (!activeGraph.connection) return null
  const { configuration = null } = activeGraph.connection
  if (!configuration) {
    return false
  }
  if (
    !configuration.authenticationMethods ||
    !configuration.authenticationMethods.kerberos
  ) {
    return false
  }
  if (!configuration.authenticationMethods.kerberos.enabled) {
    return false
  }
  return configuration.authenticationMethods.kerberos
}
