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

import { MessageArea, PaddedStatsBar } from './styled'
import { getBodyAndStatusBarMessages } from 'browser/modules/Stream/CypherFrame/helpers'
import { errorMessageFormater } from 'browser/modules/Stream/errorMessageFormater'
import {
  StyledCypherErrorMessage,
  StyledCypherInfoMessage,
  StyledCypherSuccessMessage,
  StyledCypherWarningMessage
} from 'browser/modules/Stream/styled'
import { BrowserError } from 'services/exceptions'
import { upperFirst } from 'neo4j-arc/common'
import { allowlistedMultiCommands } from 'shared/modules/commands/commandsDuck'
import { Status } from 'shared/modules/requests/requestsDuck'
import { BrowserRequest } from 'shared/modules/requests/requestsDuck'

type GenericSummaryProps = { status: Status }

const GenericSummary = ({
  status
}: GenericSummaryProps): JSX.Element | null => {
  switch (status) {
    case 'skipped':
      return (
        <PaddedStatsBar>
          <StyledCypherInfoMessage>INFO</StyledCypherInfoMessage>
          <MessageArea>
            This statements was not executed due to a previous error.
          </MessageArea>
        </PaddedStatsBar>
      )
    case 'pending':
      return (
        <PaddedStatsBar>
          <StyledCypherInfoMessage>INFO</StyledCypherInfoMessage>
          <MessageArea>Currently executing this query...</MessageArea>
        </PaddedStatsBar>
      )
    case 'waiting':
      return (
        <PaddedStatsBar>
          <StyledCypherInfoMessage>INFO</StyledCypherInfoMessage>
          <MessageArea>
            {`This query is waiting for it's turn. The execution is serial and will break on first error.`}
          </MessageArea>
        </PaddedStatsBar>
      )
    case 'ignored':
      return (
        <PaddedStatsBar>
          <StyledCypherWarningMessage>WARNING</StyledCypherWarningMessage>
          <MessageArea>
            Only the commands{' '}
            {allowlistedMultiCommands().map((cmd, i) => {
              const maybeComma = i > 0 ? ', ' : ''
              return [maybeComma, <code key={cmd}>{cmd}</code>]
            })}{' '}
            and Cypher will be executed in the multi-statement mode.
          </MessageArea>
        </PaddedStatsBar>
      )
    default:
      return null
  }
}

interface CypherSummaryProps {
  status: Status
  request: BrowserRequest
}

export const CypherSummary = ({
  status,
  request
}: CypherSummaryProps): JSX.Element | null => {
  switch (status) {
    case 'skipped':
      return <GenericSummary status={status} />
    case 'pending':
      return <GenericSummary status={status} />
    case 'waiting':
      return <GenericSummary status={status} />
    case 'success':
      const { bodyMessage } = getBodyAndStatusBarMessages(
        request.result,
        999999999
      )
      return (
        <PaddedStatsBar>
          <StyledCypherSuccessMessage>SUCCESS</StyledCypherSuccessMessage>
          <MessageArea>{upperFirst(bodyMessage || '')}</MessageArea>
        </PaddedStatsBar>
      )
    case 'error':
      const fullError = errorMessageFormater(
        (request?.result as BrowserError)?.code,
        (request?.result as BrowserError)?.message
      )
      return (
        <PaddedStatsBar>
          <StyledCypherErrorMessage>ERROR</StyledCypherErrorMessage>
          <MessageArea>{fullError.message}</MessageArea>
        </PaddedStatsBar>
      )
    default:
      return null
  }
}

interface SummaryProps {
  status: Status
  request: BrowserRequest
}

export const Summary = ({
  status,
  request
}: SummaryProps): JSX.Element | null => {
  switch (status) {
    case 'ignored':
      return <GenericSummary status={status} />
    case 'skipped':
      return <GenericSummary status={status} />
    case 'pending':
      return <GenericSummary status={status} />
    case 'waiting':
      return <GenericSummary status={status} />
    case 'success':
      return (
        <PaddedStatsBar>
          <StyledCypherSuccessMessage>SUCCESS</StyledCypherSuccessMessage>
          <MessageArea>Command was successfully executed</MessageArea>
        </PaddedStatsBar>
      )
    case 'error':
      return (
        <PaddedStatsBar>
          <StyledCypherErrorMessage>ERROR</StyledCypherErrorMessage>
          <MessageArea>
            {(request.result as BrowserError)?.message || 'Unknown error'}
          </MessageArea>
        </PaddedStatsBar>
      )
    default:
      return null
  }
}
