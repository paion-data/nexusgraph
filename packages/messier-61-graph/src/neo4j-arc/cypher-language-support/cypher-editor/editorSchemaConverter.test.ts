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
import * as convert from './editorSchemaConverter'

describe('editor meta to schema conversion', () => {
  test('convert meta label', () => {
    expect(convert.toLabel('label')).toEqual(':label')
  })

  test('convert meta relationship', () => {
    expect(convert.toRelationshipType('relType')).toEqual(':relType')
  })

  test('convert meta function', () => {
    expect(
      convert.toFunction({
        name: 'ns.functionName',
        signature: 'ns.functionName() :: (STRING?)'
      })
    ).toEqual({
      name: 'ns.functionName',
      signature: '() :: (STRING?)'
    })
  })

  test('convert meta procedure with void return items', () => {
    expect(
      convert.toProcedure({
        name: 'db.createLabel',
        signature: 'db.createLabel(newLabel :: STRING?) :: VOID'
      })
    ).toEqual({
      name: 'db.createLabel',
      signature: '(newLabel :: STRING?) :: VOID',
      returnItems: []
    })
  })

  test('convert meta procedure with single return item', () => {
    expect(
      convert.toProcedure({
        name: 'db.constraints',
        signature: 'db.constraints() :: (description :: STRING?)'
      })
    ).toEqual({
      name: 'db.constraints',
      signature: '() :: (description :: STRING?)',
      returnItems: [{ name: 'description', signature: 'STRING?' }]
    })
  })

  test('convert meta procedure with multiple return items', () => {
    expect(
      convert.toProcedure({
        name: 'db.indexes',
        signature:
          'db.indexes() :: (description :: STRING?, state :: STRING?, type :: STRING?)'
      })
    ).toEqual({
      name: 'db.indexes',
      signature:
        '() :: (description :: STRING?, state :: STRING?, type :: STRING?)',
      returnItems: [
        { name: 'description', signature: 'STRING?' },
        { name: 'state', signature: 'STRING?' },
        { name: 'type', signature: 'STRING?' }
      ]
    })
  })
})
