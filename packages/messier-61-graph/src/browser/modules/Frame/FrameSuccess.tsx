// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const FrameSuccess = (props: any) => {
  if (!props || !props.message) return null
  return (
    <span style={{ paddingLeft: '10px' }} className="statusBar--success">
      {props.message}
    </span>
  )
}

export default FrameSuccess
