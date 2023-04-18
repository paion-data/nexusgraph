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
import React, { Component } from 'react'

import { Link, StyledKey, StyledTable, StyledValue } from './styled'
import {
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'

export class UserDetails extends Component<any> {
  render() {
    const userDetails = this.props.user
    const roles = userDetails && userDetails.roles ? userDetails.roles : []
    if (userDetails.username) {
      const mappedRoles = roles.length > 0 ? roles.join(', ') : '-'
      const hasAdminRole = roles
        .map((role: any) => role.toLowerCase())
        .includes('admin')
      return (
        <DrawerSection className="user-details">
          <DrawerSubHeader>Connected as</DrawerSubHeader>
          <DrawerSectionBody>
            <StyledTable>
              <tbody>
                <tr>
                  <StyledKey>Username:</StyledKey>
                  <StyledValue data-testid="user-details-username">
                    {userDetails.username}
                  </StyledValue>
                </tr>
                <tr>
                  <StyledKey>Roles:</StyledKey>
                  <StyledValue data-testid="user-details-roles">
                    {mappedRoles}
                  </StyledValue>
                </tr>
                {hasAdminRole && (
                  <>
                    <tr>
                      <StyledKey className="user-list-button">Admin:</StyledKey>
                      <StyledValue>
                        <Link
                          onClick={() =>
                            this.props.onItemClick(':server user list')
                          }
                        >
                          :server user list
                        </Link>
                      </StyledValue>
                    </tr>
                    <tr>
                      <StyledKey className="user-list-button" />
                      <StyledValue>
                        <Link
                          onClick={() =>
                            this.props.onItemClick(':server user add')
                          }
                        >
                          :server user add
                        </Link>
                      </StyledValue>
                    </tr>
                  </>
                )}
                <tr>
                  <StyledKey className="user-list-button">
                    Disconnect:
                  </StyledKey>
                  <StyledValue>
                    <Link
                      onClick={() =>
                        this.props.onItemClick(':server disconnect')
                      }
                    >
                      :server disconnect
                    </Link>
                  </StyledValue>
                </tr>
              </tbody>
            </StyledTable>
          </DrawerSectionBody>
        </DrawerSection>
      )
    } else {
      return null
    }
  }
}
