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
import { Integer, QueryResult } from 'neo4j-driver'
import semver from 'semver'

import { guessSemverVersion } from '../features/featureDuck.utils'
import { TrialStatus, VERSION_FOR_EDITOR_HISTORY_SETTING } from './dbMetaDuck'

type ServerInfo = {
  version: string | null
  edition: string | null
}
export function extractServerInfo(res: QueryResult): ServerInfo {
  const serverInfo: ServerInfo = {
    version: 'unknown',
    edition: ''
  }

  const resultObj = res.records.map(res => res.toObject())[0]
  if (!resultObj) {
    return serverInfo
  }

  if (resultObj.versions[0]) {
    serverInfo.version = resultObj.versions[0]
  }

  if (resultObj.edition[0]) {
    serverInfo.edition = resultObj.edition
  }

  // Get server edition if available
  if (res.records.length && res.records[0].keys.includes('edition')) {
    serverInfo.edition = res.records[0].get('edition')
  }

  // Some aura servers self report versions that need coercing (eg. 3.5 or 4.3-aura)
  if (!semver.valid(serverInfo.version)) {
    serverInfo.version = guessSemverVersion(serverInfo.version)
  }

  return serverInfo
}

export const extractTrialStatus = (res: QueryResult): TrialStatus => {
  const resultObj = res.records.map(res => res.toObject())[0]

  if (!resultObj) {
    return { status: 'unknown' }
  }

  const status = resultObj.status as 'yes' | 'no' | 'eval' | 'expired'
  if (status === 'yes') {
    return { status: 'accepted' }
  } else if (status === 'eval') {
    const daysRemaining = resultObj.daysLeftOnTrial as Integer
    const totalDays = resultObj.totalTrialDays as Integer
    return {
      status: 'eval',
      daysRemaining: daysRemaining.toNumber(),
      totalDays: totalDays.toNumber()
    }
  }
  if (status === 'no') {
    return { status: 'unaccepted' }
  } else if (status === 'expired') {
    const totalDays = resultObj.totalTrialDays as Integer
    return { status: 'expired', totalDays: totalDays.toNumber() }
  }
  return { status: 'unknown' }
}

export const extractTrialStatusOld = (res: QueryResult): TrialStatus => {
  const resultObj = res.records.map(res => res.toObject())[0]

  if (!resultObj) {
    return { status: 'unknown' }
  }

  //The last string type is a number as a string
  const value = resultObj.value as 'yes' | 'no' | 'expired' | string
  if (value) {
    if (value === 'no') {
      return { status: 'unaccepted' }
    } else if (value === 'expired') {
      return { status: 'expired', totalDays: 30 }
    } else if (value === 'yes') {
      return { status: 'accepted' }
    } else {
      return { status: 'eval', daysRemaining: parseInt(value), totalDays: 30 }
    }
  }

  return { status: 'unknown' }
}

export const versionHasEditorHistorySetting = (version: string | null) => {
  if (!version) return false
  return semver.gte(version, VERSION_FOR_EDITOR_HISTORY_SETTING)
}
