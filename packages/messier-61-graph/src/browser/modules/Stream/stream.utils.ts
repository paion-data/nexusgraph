// Copyright 2023 Paion Data. All rights reserved.
import { Frame, FrameStack } from 'shared/modules/frames/framesDuck'

export function getLatestFromFrameStack(frameObj: FrameStack): Frame | null {
  if (!frameObj.stack) {
    return null
  }
  return frameObj.stack[0]
}
