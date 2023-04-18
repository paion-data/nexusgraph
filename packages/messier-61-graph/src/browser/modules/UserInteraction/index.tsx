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
import { Component } from 'react'
import { withBus } from 'react-suber'
import { Bus } from 'suber'

import { throttle } from 'services/utils'
import { USER_INTERACTION } from 'shared/modules/userInteraction/userInteractionDuck'

const reportInteraction = (bus: Bus) => {
  if (!bus) return
  bus.send(USER_INTERACTION)
}
const throttledReportInteraction: (bus: Bus) => void = throttle(
  reportInteraction,
  5000
)

export class UserInteraction extends Component<{ bus: Bus }> {
  componentDidMount() {
    document.addEventListener('keyup', () =>
      throttledReportInteraction(this.props.bus)
    )
    document.addEventListener('click', () =>
      throttledReportInteraction(this.props.bus)
    )
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', () =>
      throttledReportInteraction(this.props.bus)
    )
    document.removeEventListener('click', () =>
      throttledReportInteraction(this.props.bus)
    )
  }

  render() {
    return null
  }
}

export default withBus(UserInteraction)
