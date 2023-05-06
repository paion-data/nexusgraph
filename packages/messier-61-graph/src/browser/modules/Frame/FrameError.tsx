// Copyright 2023 Paion Data. All rights reserved.
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
