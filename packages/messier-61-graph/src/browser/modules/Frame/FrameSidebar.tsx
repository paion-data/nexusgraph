// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { StyledFrameSidebar } from './styled'

const FrameSidebar = (props: any) => {
  if (!props || !props.children) return null
  return <StyledFrameSidebar>{props.children}</StyledFrameSidebar>
}

export default FrameSidebar
