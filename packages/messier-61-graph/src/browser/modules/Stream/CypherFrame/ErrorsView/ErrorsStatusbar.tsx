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

import { deepEquals } from 'neo4j-arc/common'
import { ExclamationTriangleIcon } from 'browser-components/icons/LegacyIcons'

import Ellipsis from 'browser-components/Ellipsis'
import { errorMessageFormater } from 'project-root/src/browser/modules/Stream/errorMessageFormater'
import { ErrorText } from 'project-root/src/browser/modules/Stream/styled'
import { BrowserRequestResult } from 'project-root/src/shared/modules/requests/requestsDuck'
import { BrowserError } from 'services/exceptions'

type ErrorsStatusBarProps = {
  result: BrowserRequestResult
}
export class ErrorsStatusbar extends Component<ErrorsStatusBarProps> {
  shouldComponentUpdate(props: ErrorsStatusBarProps): boolean {
    return !deepEquals(props.result, this.props.result)
  }

  render(): null | JSX.Element {
    const error = this.props.result as BrowserError
    if (!error || (!error.code && !error.message)) return null
    const fullError = errorMessageFormater(error.code, error.message)

    return (
      <Ellipsis>
        <ErrorText title={fullError.title}>
          <ExclamationTriangleIcon /> {fullError.message}
        </ErrorText>
      </Ellipsis>
    )
  }
}
