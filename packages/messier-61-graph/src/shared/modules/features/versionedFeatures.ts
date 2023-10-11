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
import semver from 'semver'

import { getUseDb } from '../connections/connectionsDuck'
import { getActiveDbName, getRawVersion } from '../dbMeta/dbMetaDuck'
import { guessSemverVersion } from './featureDuck.utils'
import { GlobalState } from 'project-root/src/shared/globalState'

const NEO4J_4_0 = '4.0.0-alpha01'
const NEO4J_5_0 = '5.0.0-alpha01'

export const FIRST_MULTI_DB_SUPPORT = NEO4J_4_0
// Keep the following as 3.4.0 as 3.5.X has a
// compatible bolt server.
export const FIRST_NO_MULTI_DB_SUPPORT = '3.4.0'

export const getShowCurrentUserProcedure = (serverVersion: string) => {
  const serverVersionGuessed = guessSemverVersion(serverVersion)

  const pre4 = 'CALL dbms.security.showCurrentUser()'
  if (!semver.valid(serverVersionGuessed)) {
    return pre4
  }
  if (serverVersionGuessed && semver.gte(serverVersionGuessed, NEO4J_4_0)) {
    return 'CALL dbms.showCurrentUser()'
  }
  return pre4
}

export const getDbClusterRole = (state: GlobalState) => {
  const pre4 = 'CALL dbms.cluster.role() YIELD role'
  const serverVersion = guessSemverVersion(getRawVersion(state))
  if (!semver.valid(serverVersion)) {
    return pre4
  }
  if (serverVersion && semver.gte(serverVersion, NEO4J_5_0)) {
    const db = getUseDb(state)
    return `SHOW DATABASES YIELD role, name WHERE name = "${db}"`
  }
  if (serverVersion && semver.gte(serverVersion, NEO4J_4_0)) {
    const db = getUseDb(state)
    return `CALL dbms.cluster.role("${db}") YIELD role`
  }
  return pre4
}

export const hasMultiDbSupport = (state: GlobalState) => {
  const serverVersion = guessSemverVersion(getRawVersion(state))
  if (!semver.valid(serverVersion)) {
    return false
  }
  if (serverVersion && semver.gte(serverVersion, NEO4J_4_0)) {
    return true
  }
  return false
}

export const getUsedDbName = (state: GlobalState) => {
  const serverVersion = guessSemverVersion(getRawVersion(state))
  if (!semver.valid(serverVersion)) {
    return undefined
  }
  if (serverVersion && semver.gte(serverVersion, NEO4J_4_0)) {
    return getUseDb(state)
  }
  return getActiveDbName(state)
}

export const getDefaultBoltScheme = (serverVersion: string | null) => {
  const serverVersionGuessed = guessSemverVersion(serverVersion)
  const pre4 = 'bolt://'
  if (!semver.valid(serverVersionGuessed)) {
    return pre4
  }
  if (serverVersionGuessed && semver.gte(serverVersionGuessed, NEO4J_4_0)) {
    return 'neo4j://'
  }
  return pre4
}

export const changeUserPasswordQuery = (
  serverVersion: string,
  oldPw: any,
  newPw: any
) => {
  const pre4 = {
    query: 'CALL dbms.security.changePassword($password)',
    parameters: { password: newPw }
  }
  const semverVersion = guessSemverVersion(serverVersion)
  if (!semver.valid(semverVersion)) {
    return pre4
  }
  if (semverVersion && semver.gte(semverVersion, NEO4J_4_0)) {
    return {
      query: 'ALTER CURRENT USER SET PASSWORD FROM $oldPw TO $newPw',
      parameters: { oldPw, newPw }
    }
  }
  return pre4
}

export const driverDatabaseSelection = (state: GlobalState, database: any) => {
  const pre4 = undefined
  const serverVersion = guessSemverVersion(getRawVersion(state))
  if (!semver.valid(serverVersion)) {
    return pre4
  }
  if (serverVersion && semver.gte(serverVersion, NEO4J_4_0)) {
    return { database }
  }
  return pre4
}
