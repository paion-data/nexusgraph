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
import jsonic from 'jsonic'

import { collectLambdaValues, parseLambdaStatement } from './lambdas'
import { splitStringOnFirst } from 'services/commandUtils'
import { replace, update } from 'shared/modules/params/paramsDuck'

export const extractParams = (param: string) => {
  // early bail, now handled by parser
  if (param.includes('=>')) {
    return {
      isFn: true
    }
  }

  const matchParam = param.match(/^(".*"|'.*'|\S+)\s?(:|=>)\s([^$]*)$/)
  if (!matchParam) return {}
  const [, paramName, delimiter, paramValue] = matchParam
  try {
    const json = `{${paramName}${
      paramName.endsWith(':') ? ' ' : ': '
    }${paramValue}}`
    const res = jsonic(json)
    const key = Object.keys(res)[0]
    const value = res[key]
    return {
      key,
      value,
      isFn: delimiter ? delimiter.includes('=>') : false,
      originalParamValue: paramValue
    }
  } catch (e) {
    return {
      key: paramName,
      value: paramValue,
      isFn: delimiter ? delimiter.includes('=>') : false,
      originalParamValue: paramValue
    }
  }
}

const resolveAndStoreJsonValue = (param: any, put: any) => {
  try {
    const json = `{${param}}`
    const res = jsonic(json)
    put(update(res))
    return { result: res, type: 'param' }
  } catch (e) {
    throw new Error(`Could not parse input. Usage: \`:param x => 2\`. ${e}`)
  }
}

export const getParamName = (input: any) => {
  const strippedCmd = input.cmd.substr(1)
  const parts = splitStringOnFirst(strippedCmd, ' ')

  return parts[0].trim()
}

export const handleParamsCommand = async (
  action: any,
  put: any,
  onSystemDatabase: boolean
): Promise<{
  result: any
  type: string
}> => {
  if (onSystemDatabase) {
    throw new Error('Parameters cannot be declared when using system database.')
  }
  const strippedCmd = action.cmd.substr(1)
  const parts = splitStringOnFirst(strippedCmd, /\s/)
  const param = parts[1].trim()

  if (/^"?\{[\s\S]*\}"?$/.test(param)) {
    // JSON object string {"x": 2, "y":"string"}
    try {
      const res = jsonic(param.replace(/^"/, '').replace(/"$/, '')) // Remove any surrounding quotes
      put(replace(res))
      return { result: res, type: 'params' }
    } catch (e) {
      throw new Error(
        `Could not parse input. Usage: \`:params {"x":1,"y":"string"}\`. ${e}`
      )
    }
  }

  // Single param
  const { key, isFn } = extractParams(param)

  if (!isFn && Boolean(key)) {
    return resolveAndStoreJsonValue(param, put)
  }

  return parseLambdaStatement(param)
    .then(ast => collectLambdaValues(ast, action.requestId))
    .then(result => {
      put(update(result))

      return { result, type: 'param' }
    })
}
