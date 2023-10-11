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
import * as Sentry from '@sentry/react'
import React from 'react'
import styled from 'styled-components'

import { StyledErrorBoundaryButton } from 'browser-components/buttons/index'

const ErrorWrapper = styled.div`
  background-color: #fbf1f0;
  padding: 10px;
  text-align: center;
  color: #da4433;
`
type ErrorBoundaryProps = {
  caption?: string
  children: React.ReactNode
}

export default function ErrorBoundary(props: ErrorBoundaryProps): JSX.Element {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <ErrorWrapper>
          <p>
            Something went wrong: <em>"{(error || '').toString()}"</em> and the
            application can't recover.
          </p>
          <div style={{ marginTop: '5px' }}>
            <StyledErrorBoundaryButton onClick={() => window.location.reload()}>
              {props.caption || 'Reload application'}
            </StyledErrorBoundaryButton>
          </div>
        </ErrorWrapper>
      )}
    >
      {props.children}
    </Sentry.ErrorBoundary>
  )
}
