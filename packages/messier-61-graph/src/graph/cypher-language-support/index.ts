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

export { CypherEditor } from './cypher-editor/CypherEditor'
export type { CypherEditorProps } from './cypher-editor/CypherEditor'
export {
  setupAutocomplete,
  setEditorTheme,
  initalizeCypherSupport,
  getText
} from './cypher-editor/editorSupport'
export {
  parse as parseQueryOrCommand,
  createCypherLexer
} from '@neo4j-cypher/editor-support'
export { extractStatements } from '@neo4j-cypher/extract-statements'

export type {
  QueryOrCommand,
  ConsoleCommand
} from '@neo4j-cypher/editor-support'

export {
  toFunction,
  toLabel,
  toProcedure,
  toRelationshipType
} from './cypher-editor/editorSchemaConverter'
