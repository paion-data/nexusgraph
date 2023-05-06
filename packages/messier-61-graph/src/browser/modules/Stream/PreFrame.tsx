// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import FrameBodyTemplate from '../Frame/FrameBodyTemplate'
import { PaddedDiv } from './styled'

const PreFrame = ({ frame, isCollapsed, isFullscreen }: any) => {
  return (
    <FrameBodyTemplate
      isCollapsed={isCollapsed}
      isFullscreen={isFullscreen}
      contents={
        <PaddedDiv>
          <pre>{frame.result || frame.contents}</pre>
        </PaddedDiv>
      }
    />
  )
}
export default PreFrame
