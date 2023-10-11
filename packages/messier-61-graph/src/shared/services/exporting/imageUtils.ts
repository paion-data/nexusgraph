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
import canvg from 'canvg'
import FileSaver from 'file-saver'

import { prepareForExport } from './svgUtils'

export const downloadPNGFromSVG = (svg: any, graph: any, type: any) => {
  const svgObj = prepareForExport(svg, graph, type)
  const svgDefaultWidth = parseInt(svgObj.attr('width'), 10)
  const svgDefaultHeight = parseInt(svgObj.attr('height'), 10)

  // Make PNGs a bit bigger than the default zoom (to lose less quality when resizing)
  const EXTRA_SIZE = 1.5
  // also adjust for screen resolutions (to avoid blurry text)
  svgObj.attr('width', svgDefaultWidth * window.devicePixelRatio * EXTRA_SIZE)
  svgObj.attr('height', svgDefaultHeight * window.devicePixelRatio * EXTRA_SIZE)
  const svgData = htmlCharacterRefToNumericalRef(svgObj.node())

  const canvas = document.createElement('canvas')
  canvas.width = parseInt(svgObj.attr('width'), 10)
  canvas.height = parseInt(svgObj.attr('height'), 10)
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const v = canvg.fromString(ctx, svgData)
    // Resize down to smaller canvas, but higher resolution
    v.resize(canvas.width / devicePixelRatio, canvas.height / devicePixelRatio)
    v.render()
      .then(() =>
        downloadWithDataURI(`${type}.png`, canvas.toDataURL('image/png'))
      )
      .catch(() => {
        /* unhandled */
      })
  } else {
    /* unhandled */
  }
}

export const downloadSVG = (svg: any, graph: any, type: any) => {
  const svgObj = prepareForExport(svg, graph, type)
  const svgData = htmlCharacterRefToNumericalRef(svgObj.node())

  return download(`${type}.svg`, 'image/svg+xml;charset=utf-8', svgData)
}

const htmlCharacterRefToNumericalRef = (node: any) =>
  new window.XMLSerializer()
    .serializeToString(node)
    .replace(/&nbsp;/g, '&#160;')

const download = (filename: any, mime: any, data: any) => {
  const blob = new Blob([data], { type: mime })
  return FileSaver.saveAs(blob, filename)
}

const downloadWithDataURI = (filename: any, dataURI: any) => {
  let byteString, i, j, ref
  byteString = null
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = window.atob(dataURI.split(',')[1])
  } else {
    byteString = unescape(dataURI.split(',')[1])
  }
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (
    i = j = 0, ref = byteString.length;
    ref >= 0 ? j <= ref : j >= ref;
    i = ref >= 0 ? ++j : --j
  ) {
    ia[i] = byteString.charCodeAt(i)
  }
  return download(filename, mimeString, ia)
}
