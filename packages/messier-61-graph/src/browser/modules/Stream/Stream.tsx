// Copyright 2023 Paion Data. All rights reserved.
import React, { memo, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { ExportItem } from '../Frame/ExportButton'
import { FrameContainer } from './FrameContainer'
import { AnimationContainer, Padding, StyledStream } from './styled'
import { GlobalState } from 'shared/globalState'
import {
  Connection,
  getActiveConnectionData
} from 'shared/modules/connections/connectionsDuck'
import { Frame, FrameStack, getFrames } from 'shared/modules/frames/framesDuck'
import { getScrollToTop } from 'shared/modules/settings/settingsDuck'

type StreamProps = {
  frames: FrameStack[]
  activeConnectionData: Connection | null
  shouldScrollToTop: boolean
}

export interface BaseFrameProps {
  frame: Frame
  activeConnectionData: Connection | null
  stack: Frame[]
  isFullscreen: boolean
  isCollapsed: boolean
  setExportItems: (exportItems: ExportItem[]) => void
}

function Stream(props: StreamProps): JSX.Element {
  const base = useRef<HTMLDivElement>(null)
  const lastFrameCount = useRef(0)

  useEffect(() => {
    // If we want to scroll to top when a new frame is added
    if (
      lastFrameCount.current < props.frames.length &&
      props.shouldScrollToTop &&
      base.current
    ) {
      base.current.scrollTop = 0
    }

    lastFrameCount.current = props.frames.length
  })

  return (
    <StyledStream ref={base} data-testid="stream">
      {props.frames.map((frameObject: FrameStack) => (
        <AnimationContainer key={frameObject.stack[0].id}>
          <FrameContainer
            frameData={frameObject}
            activeConnectionData={props.activeConnectionData}
          />
        </AnimationContainer>
      ))}
      <Padding />
    </StyledStream>
  )
}

const mapStateToProps = (state: GlobalState) => ({
  frames: getFrames(state),
  activeConnectionData: getActiveConnectionData(state),
  shouldScrollToTop: getScrollToTop(state)
})

export default connect(mapStateToProps)(memo(Stream))
