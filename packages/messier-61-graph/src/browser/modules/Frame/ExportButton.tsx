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

import { DownloadIcon } from 'browser-components/icons/LegacyIcons'

import {
  DropDownItemDivider,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownList
} from '../Stream/styled'
import { Frame } from 'shared/modules/frames/framesDuck'

export type ExportItem = {
  name: string
  download: () => void
}
type ExportButtonProps = {
  frame: Frame
  isRelateAvailable: boolean
  newProjectFile: (cmd: string) => void
  exportItems?: ExportItem[]
}

function ExportButton({
  isRelateAvailable,
  newProjectFile,
  frame,
  exportItems = []
}: ExportButtonProps): JSX.Element {
  const canExport: boolean = exportItems.length > 0 || isRelateAvailable

  return (
    <>
      {canExport && (
        <DropdownButton title="Exports" data-testid="frame-export-dropdown">
          <DownloadIcon />
          {canExport && (
            <DropdownList>
              <DropdownContent>
                {isRelateAvailable && (
                  <>
                    <DropdownItem onClick={() => newProjectFile(frame.cmd)}>
                      Save as project file
                    </DropdownItem>
                    <DropDownItemDivider />
                  </>
                )}

                {exportItems.map(({ name, download }) => (
                  <DropdownItem
                    data-testid={`export${name}Button`}
                    onClick={download}
                    key={name}
                  >
                    Export {name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </DropdownList>
          )}
        </DropdownButton>
      )}
    </>
  )
}

export default ExportButton
