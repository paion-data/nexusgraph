// Copyright 2023 Paion Data. All rights reserved.
import React, { PureComponent } from 'react'

type State = any

export default class Display extends PureComponent<
  { if: boolean; lazy?: boolean; inline?: boolean; style?: any },
  State
> {
  state = {
    mounted: false
  }

  componentDidMount() {
    if (this.props.if) {
      this.setState({ mounted: true })
    }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (state.mounted === false && props.if) {
      return { mounted: true }
    }
    return null
  }

  render() {
    // If lazy, don't load anything until it's time
    if (!this.props.if && !this.state.mounted && this.props.lazy) {
      return null
    }
    const { style = {}, children = [] } = this.props
    const modStyle = {
      ...style,
      width: 'inherit',
      display: !this.props.if ? 'none' : this.props.inline ? 'inline' : 'block'
    }
    return <div style={modStyle}>{children}</div>
  }
}
