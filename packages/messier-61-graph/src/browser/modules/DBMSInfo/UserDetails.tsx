// Copyright 2023 Paion Data. All rights reserved.
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
