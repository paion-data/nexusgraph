// Copyright 2023 Paion Data. All rights reserved.
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
