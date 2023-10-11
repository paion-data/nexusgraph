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
import { FunctionSchema, ProcedureSchema } from '@neo4j-cypher/editor-support'

export function toLabel(label: string): string {
  return `:${label}`
}

export function toRelationshipType(relationshipType: string): string {
  return `:${relationshipType}`
}

export function toFunction(func: {
  name: string
  signature: string
}): FunctionSchema {
  return {
    name: func.name,
    signature: func.signature.replace(func.name, '')
  }
}
export function toProcedure(procedure: {
  name: string
  signature: string
}): ProcedureSchema {
  const name = procedure.name
  const signature = procedure.signature.replace(procedure.name, '')

  let returnItems: FunctionSchema[] = []
  const matches = signature.match(/\([^)]*\) :: \((.*)\)/i)
  if (matches) {
    returnItems = matches[1].split(', ').map(returnItem => {
      const returnItemMatches = returnItem.match(/(.*) :: (.*)/)
      return {
        name: returnItemMatches![1],
        signature: returnItemMatches![2]
      }
    })
  }

  return {
    name,
    signature,
    returnItems
  }
}
