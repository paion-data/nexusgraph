// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import {
  StyledCode,
  StyledConnectionBody,
  StyledConnectionFooter
} from './styled'

const ConnectedView = ({
  host,
  username,
  storeCredentials,
  hideStoreCredentials = false,
  additionalFooter = null,
  showHost = true
}: any) => {
  return (
    <StyledConnectionBody>
      {username ? (
        <span>
          You are connected as user <StyledCode>{username}</StyledCode>
          <br />
        </span>
      ) : (
        'You are connected '
      )}
      {showHost && (
        <span>
          to <StyledCode>{host}</StyledCode>
          <br />
        </span>
      )}
      {!hideStoreCredentials && (
        <StyledConnectionFooter>
          Connection credentials are {storeCredentials ? '' : 'not '}
          stored in your web browser.
        </StyledConnectionFooter>
      )}
      {additionalFooter && (
        <StyledConnectionFooter>{additionalFooter}</StyledConnectionFooter>
      )}
    </StyledConnectionBody>
  )
}
export default ConnectedView
