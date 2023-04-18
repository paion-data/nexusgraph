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
import React, { useEffect } from 'react'
import { withBus } from 'react-suber'

import FrameBodyTemplate from '../Frame/FrameBodyTemplate'
import HistoryRow from './HistoryRow'
import { PaddedDiv, UnstyledList } from './styled'
import * as editor from 'shared/modules/editor/editorDuck'

export const HistoryFrame = (props: any) => {
  const { frame, bus, setExportItems } = props
  const onHistoryClick = (cmd: string) => {
    bus.send(editor.SET_CONTENT, editor.setContent(cmd))
  }
  useEffect(() => {
    setExportItems([
      {
        name: 'history',
        download: () => {
          const txt = frame.result
            .map((line: string) => {
              const trimmedLine = `${line}`.trim()

              if (trimmedLine.startsWith(':')) {
                return trimmedLine
              }

              return trimmedLine.endsWith(';') ? trimmedLine : `${trimmedLine};`
            })
            .join('\n\n')
          const blob = new Blob([txt], {
            type: 'text/plain;charset=utf-8'
          })

          saveAs(blob, 'history.txt')
        }
      }
    ])
    return () => setExportItems([])
  }, [setExportItems, frame.result])
  const historyRows =
    frame.result.length > 0 ? (
      frame.result.map((entry: any, index: any) => {
        return (
          <HistoryRow
            key={index}
            handleEntryClick={onHistoryClick}
            entry={entry}
          />
        )
      })
    ) : (
      <PaddedDiv>
        <em>Empty history</em>
      </PaddedDiv>
    )
  return (
    <FrameBodyTemplate
      isCollapsed={props.isCollapsed}
      isFullscreen={props.isFullscreen}
      contents={<UnstyledList>{historyRows}</UnstyledList>}
    />
  )
}

export default withBus(HistoryFrame)
