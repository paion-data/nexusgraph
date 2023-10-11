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
import React from 'react'
import { connect } from 'react-redux'
import semver from 'semver'

import { GlobalState } from 'project-root/src/shared/globalState'
import { getRawVersion } from 'shared/modules/dbMeta/dbMetaDuck'

export type VersionConditionalDocProps = {
  versionCondition: string
  children: React.ReactNode
  neo4jVersion: string | null
  includeCurrent: boolean
}
export function VersionConditionalDoc({
  versionCondition,
  children,
  neo4jVersion,
  includeCurrent = false
}: VersionConditionalDocProps): JSX.Element {
  if (
    (includeCurrent && neo4jVersion === null) ||
    (neo4jVersion !== null &&
      semver.valid(neo4jVersion) &&
      semver.satisfies(neo4jVersion, versionCondition))
  ) {
    return <>{children}</>
  } else {
    return <></>
  }
}

const mapStateToProps = (state: GlobalState) => ({
  neo4jVersion: getRawVersion(state)
})

export default connect(mapStateToProps)(VersionConditionalDoc)
