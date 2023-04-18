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
