// Copyright 2023 Paion Data. All rights reserved.
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
