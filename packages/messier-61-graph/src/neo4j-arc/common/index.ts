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
export { deepEquals, mapObjectValues } from './utils/objectUtils'
export { isMac } from './utils/platformUtils'
export { extractUniqueNodesAndRels } from './utils/driverUtils'
export {
  getPropertyTypeDisplayName,
  cypherDataToString,
  propertyToString
} from './utils/cypherTypeUtils'
export { numberToUSLocale, toKeyString, upperFirst } from './utils/stringUtils'

export type {
  BasicNode,
  BasicNodesAndRels,
  BasicRelationship,
  VizItemProperty
} from './types/arcTypes'

export type {
  CypherBasicPropertyType,
  CypherDataType,
  CypherList,
  CypherMap,
  CypherProperty,
  CypherStructuralType
} from './types/cypherDataTypes'

export {
  isCypherTemporalType,
  isCypherBasicPropertyType,
  isCypherPropertyType
} from './types/cypherDataTypes'

export { ClickableUrls } from './components/ClickableUrls'
export { ClipboardCopier, copyToClipboard } from './components/ClipboardCopier'
export {
  StyledLabelChip,
  StyledPropertyChip,
  StyledRelationshipChip
} from './components/LabelAndReltypes'
export { ShowMoreOrAll } from './components/ShowMoreOrAll/ShowMoreOrAll'
export { PropertiesTable } from './components/PropertiesTable/PropertiesTable'
export { WarningMessage } from './components/WarningMessage'

// temporary, icons will be fetched from NDL later
export * from './icons/Icons'

export { ArcThemeProvider, baseArcTheme } from './styles/themes'
