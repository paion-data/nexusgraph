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
import React, { useEffect, useState } from 'react'
import uuid from 'uuid'

import Carousel from '../Carousel/Carousel'
import Slide from '../Carousel/Slide'
import MdSlide from './MD/MdSlide'
import { splitMdSlides } from './MD/splitMd'
import Directives from 'browser-components/Directives'

type DocsProps = {
  slides?: JSX.Element[] | null
  content?: JSX.Element | null
  html?: string
  md?: string
  initialSlide?: number
  onSlide?: Function
  lastUpdate?: number
  originFrameId?: string
  withDirectives?: true
}

export default function Docs({
  slides,
  content,
  html,
  md,
  initialSlide,
  onSlide,
  originFrameId,
  withDirectives = true,
  lastUpdate
}: DocsProps): JSX.Element | null {
  const [stateSlides, setStateSlides] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (slides && slides.length) {
      setStateSlides(slides)
      return
    }
    let slide = <Slide html="" />
    if (content) {
      slide = <Slide content={content} />
    } else if (html) {
      const tmpDiv = document.createElement('div')
      tmpDiv.innerHTML = html
      const htmlSlides = tmpDiv.getElementsByTagName('slide')
      if (htmlSlides && htmlSlides.length) {
        const reactSlides = Array.from(htmlSlides).map(slide => {
          return <Slide key={uuid.v4()} html={slide.innerHTML} />
        })
        setStateSlides(reactSlides)
        return
      }
      slide = <Slide html={html} />
    } else if (md) {
      setStateSlides(
        splitMdSlides(md).map(slide => (
          <MdSlide key={uuid.v4()} md={slide}></MdSlide>
        ))
      )
      return
    }

    slide = <Directives originFrameId={originFrameId} content={slide} />
    setStateSlides([slide])

    if (onSlide) {
      onSlide({ hasPrev: false, hasNext: false, slideIndex: 0 })
    }
  }, [slides, content, html, lastUpdate])

  if (stateSlides.length > 1) {
    return (
      <Carousel
        onSlide={onSlide}
        slides={stateSlides}
        initialSlide={initialSlide}
        withDirectives={withDirectives}
        originFrameId={originFrameId}
      />
    )
  } else if (stateSlides.length) {
    return stateSlides[0]
  }
  return null
}
