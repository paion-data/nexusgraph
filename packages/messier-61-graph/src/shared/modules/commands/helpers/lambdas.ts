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
import { parseLambda } from '@neo4j/browser-lambda-parser'
import {
  assign,
  head,
  join,
  map,
  reduce,
  slice,
  split,
  tail,
  trim
} from 'lodash-es'

import bolt from '../../../services/bolt/bolt'
import { recursivelyTypeGraphItems } from '../../../services/bolt/boltMappings'
import { userDirectTxMetadata } from '../../../services/bolt/txMetadata'
import arrayHasItems from '../../../utils/array-has-items'

const FAT_ARROW = '=>'
const TOKEN = 'token'
const ARRAY = 'array'
const IMPLICIT = 'implicit'
const NEARLEY_ERROR_SPLIT =
  'Instead, I was expecting to see one of the following:'

export function parseLambdaStatement(lambda: any) {
  return Promise.resolve()
    .then(() => {
      const ast = parseLambda(trim(lambda))

      if (!arrayHasItems(ast)) {
        throw new Error(
          "Unrecognized input. Sorry we couldn't be more specific."
        )
      }

      const [
        {
          parameters,
          variant,
          body: { returnValues }
        }
      ] = ast
      const statement = trim(join(tail(split(lambda, FAT_ARROW)), FAT_ARROW))
      const query =
        variant === IMPLICIT
          ? `RETURN ${statement}`
          : statement.slice(1, statement.length - 1)

      return {
        parameters,
        query,
        variant,
        returnValues
      }
    })
    .catch(e => {
      throw new Error(head(split(e, NEARLEY_ERROR_SPLIT)))
    })
}

export async function collectLambdaValues(
  { parameters, query, variant }: any,
  requestId: any
) {
  const [_id, request] = bolt.routedWriteTransaction(
    query,
    {},
    {
      requestId,
      cancelable: false,
      ...userDirectTxMetadata
    }
  )

  const { records }: { records: any[] } = await request
  if (variant === IMPLICIT) {
    const firstResult: any = head(records)

    return firstResult
      ? recursivelyTypeGraphItems({
          [parameters.value]: firstResult.get(head(firstResult.keys))
        })
      : {}
  }

  if (parameters.type === TOKEN) {
    const extractedRecords = map(records, record =>
      reduce(
        record.keys,
        (agg, next) =>
          assign(agg, {
            [next]: record.get(next)
          }),
        {}
      )
    )

    return {
      [parameters.value]: map(extractedRecords, record =>
        recursivelyTypeGraphItems(record)
      )
    }
  }

  // future proofing
  if (parameters.type !== ARRAY) return {}

  const { items } = parameters
  const extractedRecords = map(
    slice(records, 0, items.length),
    (record, index) => {
      const item = items[index]
      const keys = item.type === TOKEN ? [item] : item.keys // item.type === OBJECT

      return reduce(
        keys,
        (agg, next) =>
          assign(agg, {
            [next.alias || next.value]: record.get(next.value)
          }),
        {}
      )
    }
  )

  return reduce(
    extractedRecords,
    (agg, record) => assign(agg, recursivelyTypeGraphItems(record)),
    {}
  )
}
