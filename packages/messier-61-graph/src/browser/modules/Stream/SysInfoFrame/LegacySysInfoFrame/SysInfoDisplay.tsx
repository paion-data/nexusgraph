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

import { QuestionIcon } from 'browser-components/icons/LegacyIcons'

import { buildTableData } from './sysinfoUtils'
import {
  StyledSysInfoTable,
  SysInfoTableContainer,
  SysInfoTableEntry
} from 'browser-components/Tables'
import arrayHasItems from 'shared/utils/array-has-items'

export const SysInfoDisplay = ({
  storeSizes,
  idAllocation,
  pageCache,
  transactions,
  isOnCluster,
  cc,
  ha,
  haInstances
}: any): JSX.Element => {
  return (
    <SysInfoTableContainer>
      <StyledSysInfoTable key="StoreSizes" header="Store Sizes">
        {buildTableData(storeSizes)}
      </StyledSysInfoTable>
      <StyledSysInfoTable key="IDAllocation" header="ID Allocation">
        {buildTableData(idAllocation)}
      </StyledSysInfoTable>
      <StyledSysInfoTable key="PageCache" header="Page Cache">
        {buildTableData(pageCache)}
      </StyledSysInfoTable>
      <StyledSysInfoTable key="Transactionss" header="Transactions">
        {buildTableData(transactions)}
      </StyledSysInfoTable>
      {isOnCluster && (
        <StyledSysInfoTable
          key="cc-table"
          header={
            <span data-testid="sysinfo-cluster-members-title">
              Cluster Members{' '}
              <QuestionIcon title="Values shown in `:sysinfo` may differ between cluster members" />
            </span>
          }
          colspan="5"
        >
          <SysInfoTableEntry
            key="cc-entry"
            headers={['Roles', 'Addresses', 'Groups', 'Database', 'Actions']}
          />
          {buildTableData(cc)}
        </StyledSysInfoTable>
      )}
      {arrayHasItems(ha) && (
        <StyledSysInfoTable key="ha-table" header="High Availability">
          {buildTableData(ha)}
        </StyledSysInfoTable>
      )}
      {arrayHasItems(haInstances) && (
        <StyledSysInfoTable key="cluster-table" header="Cluster" colspan="4">
          <SysInfoTableEntry
            key="ha-entry"
            headers={['Id', 'Alive', 'Available', 'Is Master']}
          />
          {buildTableData(haInstances)}
        </StyledSysInfoTable>
      )}
    </SysInfoTableContainer>
  )
}
