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

const measureTextWidthByCanvas = (
  text: string,
  font: string,
  context: CanvasRenderingContext2D
): number => {
  context.font = font
  return context.measureText(text).width
}

const cacheTextWidth = function () {
  const CATCH_SIZE = 100000
  const textMeasureMap: { [key: string]: number } = {}
  const lruKeyList: string[] = []
  return (key: string, calculate: () => number) => {
    const cached = textMeasureMap[key]
    if (cached) {
      return cached
    } else {
      const result = calculate()
      if (lruKeyList.length > CATCH_SIZE) {
        delete textMeasureMap[lruKeyList.splice(0, 1).toString()]
        lruKeyList.push(key)
      }
      return (textMeasureMap[key] = result)
    }
  }
}

export function measureText(
  text: string,
  fontFamily: string,
  fontSize: number,
  canvas2DContext: CanvasRenderingContext2D
): number {
  const font = `normal normal normal ${fontSize}px/normal ${fontFamily}`
  return cacheTextWidth()(`[${font}][${text}]`, () =>
    measureTextWidthByCanvas(text, font, canvas2DContext)
  )
}
