// Copyright 2023 Paion Data. All rights reserved.
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
