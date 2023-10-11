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

import { BorderedWrapper, ContentArea, TitleBar } from './styled'

type AccordionState = any

class Accordion extends Component<{ render: any }, AccordionState> {
  static Title: any

  static Content: any

  state = {
    activeIndex: -1,
    initialLoad: true
  }

  titleClick = (index: any) => {
    const newIndex = this.state.activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex, initialLoad: false })
  }

  getChildProps = ({
    index,
    defaultActive = false,
    forceActive = false
  }: any) => {
    const props: any = {
      titleProps: {
        onClick: () => this.titleClick(index)
      },
      contentProps: {}
    }
    if (forceActive) {
      props.titleProps.onClick = () => {}
    }
    if (defaultActive && this.state.initialLoad) {
      props.titleProps.onClick = () => this.titleClick(-1)
    }
    if (
      index === this.state.activeIndex ||
      (this.state.initialLoad && defaultActive) ||
      forceActive
    ) {
      props.titleProps.active = true
      props.contentProps.active = true
      return props
    }
    props.titleProps.active = false
    props.contentProps.active = false
    return props
  }

  render() {
    const { getChildProps } = this
    const { render: renderProp, ...rest } = this.props
    return (
      <BorderedWrapper {...rest}>
        {renderProp({ getChildProps })}
      </BorderedWrapper>
    )
  }
}

const Title = ({ children, ...rest }: any) => {
  return <TitleBar {...rest}>{children}</TitleBar>
}
Accordion.Title = Title

const Content = ({ children, active, ...rest }: any) => {
  if (!active) return null
  return <ContentArea {...rest}>{children}</ContentArea>
}
Accordion.Content = Content

export default Accordion
