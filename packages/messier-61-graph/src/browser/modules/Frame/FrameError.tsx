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

import { ExclamationTriangleIcon } from 'browser-components/icons/LegacyIcons'

import { errorMessageFormater } from '../Stream/errorMessageFormater'
import { ErrorText } from '../Stream/styled'
import Ellipsis from 'browser-components/Ellipsis'

const FrameError = (props: any) => {
  if (!props || (!props.code && !props.message)) return null
  const fullError = errorMessageFormater(props.code, props.message)
  return (
    <Ellipsis>
      <ErrorText title={fullError.title}>
        <ExclamationTriangleIcon /> {fullError.message}
      </ErrorText>
    </Ellipsis>
  )
}

export default FrameError
