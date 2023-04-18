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
import { map, take } from 'lodash-es'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  PaddedDiv,
  StyledAlteringTr,
  StyledExpandable,
  StyledStrongTd,
  StyledTBody,
  StyledTable,
  StyledTd
} from '../styled'
import {
  RelatableStatusbar,
  RelatableStatusbarComponent
} from './RelatableView/relatable-view'
import { deepEquals } from 'neo4j-arc/common'
import { GlobalState } from 'shared/globalState'
import { getMaxFieldItems } from 'shared/modules/settings/settingsDuck'

type ExpandableContentState = any

class ExpandableContent extends Component<any, ExpandableContentState> {
  state: any = {}
  render() {
    return (
      <StyledAlteringTr>
        <StyledStrongTd>
          {this.props.title}
          <StyledExpandable
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            className={
              this.state.expanded ? 'fa fa-caret-down' : 'fa fa-caret-right'
            }
            title={this.state.expanded ? 'Hide section' : 'Expand section'}
          />
        </StyledStrongTd>
        <StyledTd>
          {this.state.expanded ? this.props.content : this.props.summary}
        </StyledTd>
      </StyledAlteringTr>
    )
  }
}

const fieldLimiterFactory = (maxFieldItems: any) => (key: any, val: any) => {
  if (!maxFieldItems || key !== '_fields') {
    return val
  }

  return map(val, field => {
    return Array.isArray(field) ? take(field, maxFieldItems) : field
  })
}

export class CodeViewComponent extends Component<any> {
  shouldComponentUpdate(props: any) {
    return !this.props.result || !deepEquals(props.result, this.props.result)
  }
  render() {
    const { request = {}, query, maxFieldItems } = this.props
    if (request.status !== 'success') return null
    const resultJson = JSON.stringify(
      request.result.records,
      fieldLimiterFactory(maxFieldItems),
      2
    )
    const summaryJson = JSON.stringify(
      request.result.summary,
      fieldLimiterFactory(maxFieldItems),
      2
    )
    return (
      <PaddedDiv>
        <StyledTable>
          <StyledTBody>
            <StyledAlteringTr>
              <StyledStrongTd>Server version</StyledStrongTd>
              <StyledTd>{request.result.summary.server.agent}</StyledTd>
            </StyledAlteringTr>
            <StyledAlteringTr>
              <StyledStrongTd>Server address</StyledStrongTd>
              <StyledTd>{request.result.summary.server.address}</StyledTd>
            </StyledAlteringTr>
            <StyledAlteringTr>
              <StyledStrongTd>Query</StyledStrongTd>
              <StyledTd>{query}</StyledTd>
            </StyledAlteringTr>
            <ExpandableContent
              title="Summary"
              content={<pre>{summaryJson}</pre>}
              summary={summaryJson.split('\n').slice(0, 3) + ' ...'}
            />
            <ExpandableContent
              title="Response"
              content={<pre>{resultJson}</pre>}
              summary={resultJson.split('\n').slice(0, 3) + ' ...'}
            />
          </StyledTBody>
        </StyledTable>
      </PaddedDiv>
    )
  }
}

export const CodeView = connect((state: GlobalState) => ({
  maxFieldItems: getMaxFieldItems(state)
}))(CodeViewComponent)

export const CodeStatusbarComponent = RelatableStatusbarComponent
export const CodeStatusbar = RelatableStatusbar
