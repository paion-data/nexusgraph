// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import {
  CheckedSquareIcon,
  ExclamationTriangleIcon,
  SmallSpinnerIcon,
  SquareIcon
} from 'browser-components/icons/LegacyIcons'

import { ErrorSpan, SuccessSpan, WarningSpan } from './styled'
import { Status } from 'shared/modules/requests/requestsDuck'

interface IconProps {
  status: Status
}

export const Icon = ({ status }: IconProps): JSX.Element => {
  switch (status) {
    case 'pending':
      return <SmallSpinnerIcon />
    case 'skipped':
    case 'waiting':
      return <SquareIcon />
    case 'success':
      return (
        <SuccessSpan>
          <CheckedSquareIcon />
        </SuccessSpan>
      )
    case 'ignored':
      return (
        <WarningSpan>
          <SquareIcon />
        </WarningSpan>
      )
    case 'error':
      return (
        <ErrorSpan>
          <ExclamationTriangleIcon />
        </ErrorSpan>
      )
    default:
      return <>???</>
  }
}
