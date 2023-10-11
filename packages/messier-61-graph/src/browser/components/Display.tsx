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
