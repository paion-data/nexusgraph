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

import {
  StyledMissingParamsTemplateLink,
  StyledParamsTemplateClickableArea,
  StyledSpecifyParamsText
} from 'project-root/src/browser/modules/Stream/styled'
import { stringModifier } from 'services/bolt/cypherTypesFormatting'
import { BrowserError } from 'services/exceptions'
import { stringifyMod } from 'services/utils'

type MissingParamsTemplateLinkProps = {
  error: BrowserError
  params: Record<string, unknown>
  setEditorContent: (cmd: string) => void
  onTemplateHelpMessageClick: () => void
}
export const MissingParamsTemplateLink = ({
  setEditorContent,
  params,
  error,
  onTemplateHelpMessageClick
}: MissingParamsTemplateLinkProps): JSX.Element => {
  const handleTemplateHelpMessageClick = (): void => {
    onTemplateHelpMessageClick()
    const missingParams = getMissingParams(error.message)
    const template = getSettingMissingParamsTemplate(missingParams, params)
    setEditorContent(template)
  }

  const getMissingParams = (missingParamsErrorMessage: string) => {
    const regExp = new RegExp(`^Expected parameter\\(s\\): (.*?)$`, 'g')
    const match = regExp.exec(missingParamsErrorMessage)
    if (match && match.length > 1) {
      return match[1].split(', ')
    } else {
      return []
    }
  }
  const getSettingMissingParamsTemplate = (
    missingParams: string[],
    existingParams: Record<string, unknown>
  ): string => {
    const missingParamsTemplate = missingParams
      .map(param => `  "${param}": fill_in_your_value`)
      .join(',\n')

    let existingParamsTemplate = ''
    const existingParamsIsEmpty = Object.keys(existingParams).length === 0
    if (!existingParamsIsEmpty) {
      const existingParamsStringWithBracketsAndSurroundingNewlines =
        stringifyMod(existingParams, stringModifier, true)
      const existingParamsStringCleaned =
        existingParamsStringWithBracketsAndSurroundingNewlines
          .slice(
            1,
            existingParamsStringWithBracketsAndSurroundingNewlines.length - 1
          )
          .trim()
      existingParamsTemplate = `,\n\n  ${existingParamsStringCleaned}`
    }

    return `:params \n{\n${missingParamsTemplate}${existingParamsTemplate}\n}`
  }

  return (
    <StyledMissingParamsTemplateLink>
      <span>Use this template to add missing parameter(s):</span>
      <StyledParamsTemplateClickableArea
        onClick={() => handleTemplateHelpMessageClick()}
        aria-label={
          'Set editor content with template to be used for setting the missing parameters'
        }
      >
        :params{'{'}
        <StyledSpecifyParamsText>specify params</StyledSpecifyParamsText>
        {'}'}
      </StyledParamsTemplateClickableArea>
    </StyledMissingParamsTemplateLink>
  )
}
