// Copyright 2023 Paion Data. All rights reserved.
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
