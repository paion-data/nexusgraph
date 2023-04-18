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
import React, { TransitionEvent, useEffect, useState } from 'react'

import { StyledNodeInspectorContainer } from './styled'

const Closing = 'CLOSING'
const Closed = 'CLOSED'
const Open = 'OPEN'
const Opening = 'OPENING'
type DrawerTransitionState =
  | typeof Closing
  | typeof Closed
  | typeof Open
  | typeof Opening

type NodeInspectorDrawerProps = {
  isOpen: boolean
  width: number
  children: JSX.Element
}
export function NodeInspectorDrawer({
  width,
  isOpen,
  children
}: NodeInspectorDrawerProps): JSX.Element {
  const [transitionState, setTransitionState] = useState<DrawerTransitionState>(
    isOpen ? Open : Closed
  )

  useEffect(() => {
    if (isOpen) {
      if (transitionState === Closed || transitionState === Closing) {
        setTransitionState(Opening)
      }
    } else {
      if (transitionState === Open || transitionState === Opening) {
        setTransitionState(Closing)
      }
    }
  }, [isOpen, transitionState])

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (event.propertyName !== 'width') {
      return
    }
    if (transitionState === Closing) {
      setTransitionState(Closed)
    }
    if (transitionState === Opening) {
      setTransitionState(Open)
    }
  }

  const drawerIsVisible =
    transitionState === Opening ||
    transitionState === Open ||
    transitionState === Closing

  return (
    <StyledNodeInspectorContainer
      paneWidth={!isOpen ? 0 : width}
      onTransitionEnd={onTransitionEnd}
      shouldAnimate={transitionState !== Open}
    >
      {drawerIsVisible && children}
    </StyledNodeInspectorContainer>
  )
}
