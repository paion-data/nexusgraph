// Copyright 2023 Paion Data. All rights reserved.

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
