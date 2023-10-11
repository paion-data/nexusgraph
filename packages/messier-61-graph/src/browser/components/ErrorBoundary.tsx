// Copyright 2023 Paion Data. All rights reserved.
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
