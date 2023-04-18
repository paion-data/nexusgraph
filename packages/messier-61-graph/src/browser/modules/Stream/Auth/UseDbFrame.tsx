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
