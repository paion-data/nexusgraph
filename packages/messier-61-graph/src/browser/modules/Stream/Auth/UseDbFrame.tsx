// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { BaseFrameProps } from '../Stream'
import {
  StyledCode,
  StyledConnectionAside,
  StyledConnectionBody,
  StyledConnectionBodyContainer
} from './styled'
import { H3 } from 'browser-components/headers'
import TextCommand from 'browser/modules/DecoratedText/TextCommand'
import FrameBodyTemplate from 'browser/modules/Frame/FrameBodyTemplate'
import { listDbsCommand } from 'shared/modules/commands/commandsDuck'

const UseDbFrame = (props: BaseFrameProps) => {
  const { frame } = props
  const { useDb } = frame
  return (
    <>
      <StyledConnectionAside>
        <span>
          <React.Fragment>
            <H3>Use database</H3>
            You have updated what database to use in the Neo4j dbms.
          </React.Fragment>
        </span>
      </StyledConnectionAside>
      <StyledConnectionBodyContainer>
        <StyledConnectionBody>
          {useDb ? (
            <>
              Queries from this point and forward are using the database{' '}
              <StyledCode>{useDb}</StyledCode> as the target.
            </>
          ) : (
            "You are now targeting the dbms's default database."
          )}
          <div>
            Use the <TextCommand command={listDbsCommand} /> to list all
            available databases.
          </div>
        </StyledConnectionBody>
      </StyledConnectionBodyContainer>
    </>
  )
}

const Frame = (props: BaseFrameProps): JSX.Element => {
  return (
    <FrameBodyTemplate
      isCollapsed={props.isCollapsed}
      isFullscreen={props.isFullscreen}
      contents={<UseDbFrame {...props} />}
    />
  )
}

export default Frame
