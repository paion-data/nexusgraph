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
import { RelationshipCaptionLayout } from '../models/Relationship'

export class StraightArrow {
  length: number
  midShaftPoint: { x: number; y: number }
  outline: (shortCaptionLength: number) => string
  overlay: (minWidth: number) => string
  shaftLength: number
  deflection = 0

  constructor(
    startRadius: number,
    endRadius: number,
    centreDistance: number,
    shaftWidth: number,
    headWidth: number,
    headHeight: number,
    captionLayout: RelationshipCaptionLayout
  ) {
    this.length = centreDistance - (startRadius + endRadius)

    this.shaftLength = this.length - headHeight
    const startArrow = startRadius
    const endShaft = startArrow + this.shaftLength
    const endArrow = startArrow + this.length
    const shaftRadius = shaftWidth / 2
    const headRadius = headWidth / 2

    this.midShaftPoint = {
      x: startArrow + this.shaftLength / 2,
      y: 0
    }

    this.outline = function (shortCaptionLength: number) {
      if (captionLayout === 'external') {
        const startBreak =
          startArrow + (this.shaftLength - shortCaptionLength) / 2
        const endBreak = endShaft - (this.shaftLength - shortCaptionLength) / 2

        return [
          'M',
          startArrow,
          shaftRadius,
          'L',
          startBreak,
          shaftRadius,
          'L',
          startBreak,
          -shaftRadius,
          'L',
          startArrow,
          -shaftRadius,
          'Z',
          'M',
          endBreak,
          shaftRadius,
          'L',
          endShaft,
          shaftRadius,
          'L',
          endShaft,
          headRadius,
          'L',
          endArrow,
          0,
          'L',
          endShaft,
          -headRadius,
          'L',
          endShaft,
          -shaftRadius,
          'L',
          endBreak,
          -shaftRadius,
          'Z'
        ].join(' ')
      } else {
        return [
          'M',
          startArrow,
          shaftRadius,
          'L',
          endShaft,
          shaftRadius,
          'L',
          endShaft,
          headRadius,
          'L',
          endArrow,
          0,
          'L',
          endShaft,
          -headRadius,
          'L',
          endShaft,
          -shaftRadius,
          'L',
          startArrow,
          -shaftRadius,
          'Z'
        ].join(' ')
      }
    }

    this.overlay = function (minWidth: number) {
      const radius = Math.max(minWidth / 2, shaftRadius)
      return [
        'M',
        startArrow,
        radius,
        'L',
        endArrow,
        radius,
        'L',
        endArrow,
        -radius,
        'L',
        startArrow,
        -radius,
        'Z'
      ].join(' ')
    }
  }
}
