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
import { withBus } from 'react-suber'

import {
  Link,
  StyledKey,
  StyledTable,
  StyledValue,
  StyledValueUCFirst
} from './styled'
import {
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import { toHumanReadableBytes } from 'services/utils'
import {
  commandSources,
  executeCommand,
  listDbsCommand
} from 'shared/modules/commands/commandsDuck'
import {
  Database,
  getDatabases,
  getEdition,
  getStoreSize,
  getRawVersion
} from 'shared/modules/dbMeta/dbMetaDuck'
import { getUsedDbName } from 'shared/modules/features/versionedFeatures'
import { getClusterRoleForCurrentDb } from 'shared/utils/selectors'

type DatabaseKernelInfo = {
  role: any
  version: string | null
  edition: string | null
  dbName: any
  storeSize: any
  onItemClick: any
  databases: Database[]
}
export const DatabaseKernelInfo = ({
  role,
  version,
  edition,
  dbName,
  storeSize,
  onItemClick,
  databases
}: DatabaseKernelInfo) => {
  return (
    <DrawerSection className="database-kernel-info">
      <DrawerSubHeader>DBMS</DrawerSubHeader>
      <DrawerSectionBody>
        <StyledTable>
          <tbody>
            {role && (
              <tr>
                <StyledKey>Cluster role: </StyledKey>
                <StyledValue>{role}</StyledValue>
              </tr>
            )}
            {version && (
              <tr>
                <StyledKey>Version: </StyledKey>
                <StyledValue>{version}</StyledValue>
              </tr>
            )}
            {edition && (
              <tr>
                <StyledKey>Edition: </StyledKey>
                <StyledValueUCFirst>{edition}</StyledValueUCFirst>
              </tr>
            )}
            {dbName && (
              <tr>
                <StyledKey>Name: </StyledKey>
                <StyledValue>{dbName}</StyledValue>
              </tr>
            )}
            {storeSize && (
              <tr>
                <StyledKey>Size: </StyledKey>
                <StyledValue>{toHumanReadableBytes(storeSize)}</StyledValue>
              </tr>
            )}
            {databases && databases.length > 0 && (
              <tr>
                <StyledKey>Databases: </StyledKey>
                <StyledValue>
                  <Link onClick={() => onItemClick(`:${listDbsCommand}`)}>
                    :{listDbsCommand}
                  </Link>
                </StyledValue>
              </tr>
            )}
            <tr>
              <StyledKey>Information: </StyledKey>
              <StyledValue>
                <Link onClick={() => onItemClick(':sysinfo')}>:sysinfo</Link>
              </StyledValue>
            </tr>
            <tr>
              <StyledKey>Query List: </StyledKey>
              <StyledValue>
                <Link onClick={() => onItemClick(':queries')}>:queries</Link>
              </StyledValue>
            </tr>
          </tbody>
        </StyledTable>
      </DrawerSectionBody>
    </DrawerSection>
  )
}

const mapStateToProps = (state: any) => {
  return {
    version: getRawVersion(state),
    edition: getEdition(state),
    dbName: getUsedDbName(state),
    storeSize: getStoreSize(state),
    role: getClusterRoleForCurrentDb(state),
    databases: getDatabases(state)
  }
}
const mapDispatchToProps = (_dispatch: any, ownProps: any) => {
  return {
    onItemClick: (cmd: any) => {
      const action = executeCommand(cmd, { source: commandSources.button })
      ownProps.bus.send(action.type, action)
    }
  }
}

export default withBus(
  connect(mapStateToProps, mapDispatchToProps)(DatabaseKernelInfo)
)
