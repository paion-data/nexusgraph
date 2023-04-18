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

import {
  StackNextIcon,
  StackPreviousIcon
} from 'browser-components/icons/LegacyIcons'

import docs from '../../documentation'
import { DynamicTopics } from '../../documentation/templates/DynamicTopics'
import Docs from '../Docs/Docs'
import FrameAside from '../Frame/FrameAside'
import FrameBodyTemplate from '../Frame/FrameBodyTemplate'
import { CarouselButton } from 'browser-components/buttons/index'
import { transformCommandToHelpTopic } from 'services/commandUtils'
import { BaseFrameProps } from './Stream'

const HelpFrame = ({
  stack,
  isFullscreen,
  isCollapsed
}: BaseFrameProps): JSX.Element => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const currentFrame = stack[currentFrameIndex]

  // When we get a new frame, go to it
  useEffect(() => {
    setCurrentFrameIndex(0)
  }, [stack.length])

  const { aside, main } = generateContent(currentFrame)

  const prevBtn =
    currentFrameIndex === stack.length - 1 ? null : (
      <CarouselButton
        className="previous-slide rounded"
        data-testid="prev-in-stack-button"
        onClick={() => setCurrentFrameIndex(index => index + 1)}
      >
        <StackPreviousIcon />
      </CarouselButton>
    )

  const nextBtn =
    currentFrameIndex === 0 ? null : (
      <CarouselButton
        className="next-slide rounded"
        data-testid="next-in-stack-button"
        onClick={() => setCurrentFrameIndex(index => index - 1)}
      >
        <StackNextIcon />
      </CarouselButton>
    )

  const contents =
    stack.length > 1 ? (
      <React.Fragment>
        {prevBtn}
        {main}
        {nextBtn}
      </React.Fragment>
    ) : (
      main
    )
  return (
    <FrameBodyTemplate
      isCollapsed={isCollapsed}
      isFullscreen={isFullscreen}
      aside={aside}
      contents={contents}
      hasSlides
    />
  )
}

function generateContent(frame: any) {
  const { help, cypher, bolt } = docs
  const chapters: any = {
    ...help.chapters,
    ...cypher.chapters,
    ...bolt.chapters
  }

  let main: JSX.Element | string = 'Help topic not specified'
  let aside

  if (frame.result) {
    main = <Docs withDirectives originFrameId={frame.id} html={frame.result} />
  } else {
    const helpTopic = transformCommandToHelpTopic(frame.cmd)
    if (helpTopic !== '') {
      const chapter = chapters[helpTopic] || chapters.unfound
      const { title, subtitle } = chapter
      let { content } = chapter

      // The commands topic is a special case that uses dynamic data
      const dynamic = ['bolt', 'commands', 'play', 'guides', 'help', 'cypher']
      if (dynamic.includes(helpTopic)) {
        content = <DynamicTopics docs={docs} {...chapter} />
      }

      aside = title ? <FrameAside title={title} subtitle={subtitle} /> : null
      main = <Docs withDirectives originFrameId={frame.id} content={content} />
    }
  }
  return { aside, main }
}

export default HelpFrame
