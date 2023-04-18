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
import React from 'react'

// credits to https://www.regextester.com/96504, modified though
const URL_REGEX =
  /(?:https?|s?ftp|bolt):\/\/(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gi

interface ClickableUrlsProps {
  text?: string | null
  WrappingTag?: keyof JSX.IntrinsicElements | React.ElementType
}

export function ClickableUrls({
  text,
  WrappingTag = 'span'
}: ClickableUrlsProps): JSX.Element {
  const definedText = text || ''
  const urls = definedText.match(URL_REGEX) || []
  return (
    <WrappingTag>
      {definedText.split(URL_REGEX).map((text, index) => {
        /* since we never move these components this key should be fine */
        return (
          <React.Fragment key={index}>
            {text}
            {urls[index] && (
              <a href={urls[index]} target="_blank" rel="noreferrer">
                {urls[index]}
              </a>
            )}
          </React.Fragment>
        )
      })}
    </WrappingTag>
  )
}
