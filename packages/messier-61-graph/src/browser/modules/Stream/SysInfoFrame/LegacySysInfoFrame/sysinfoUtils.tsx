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
import neo4j from 'neo4j-driver'
import React from 'react'

import { toKeyString } from 'neo4j-arc/common'

import { SysInfoTableEntry } from 'browser-components/Tables'
import {
  extractFromNeoObjects,
  itemIntToString
} from 'services/bolt/boltMappings'

export const getTableDataFromRecords = (records: any) => {
  if (!records || !records.length) {
    return {}
  }
  const mappedJMXresults = mappedJMXresult(records)
  const jmxQueryPrefix = mappedJMXresults[0].name.split(',')[0]
  const result = Object.assign(
    {},
    ...mappedJMXresults.map((item: any) => {
      return { [item.name]: item }
    })
  )
  const cache =
    flattenAttributes(result[`${jmxQueryPrefix},name=Page cache`]) || {}
  const primitive =
    flattenAttributes(result[`${jmxQueryPrefix},name=Primitive count`]) || {}
  const tx =
    flattenAttributes(result[`${jmxQueryPrefix},name=Transactions`]) || {}
  const kernel = {
    ...flattenAttributes(result[`${jmxQueryPrefix},name=Configuration`]),
    ...flattenAttributes(result[`${jmxQueryPrefix},name=Kernel`]),
    ...flattenAttributes(result[`${jmxQueryPrefix},name=Store file sizes`]),
    ...flattenAttributes(result[`${jmxQueryPrefix},name=Store sizes`])
  }
  const ha = result[`${jmxQueryPrefix},name=High Availability`]
    ? flattenAttributes(result[`${jmxQueryPrefix},name=High Availability`])
    : null

  return {
    cache,
    primitive,
    tx,
    kernel,
    ha
  }
}

const mappedJMXresult = (records: any) => {
  return records.map((record: any) => {
    const origAttributes = record.get('attributes')
    return {
      name: record.get('name'),
      attributes: Object.keys(record.get('attributes')).map(attributeName => {
        return {
          name: attributeName,
          value: origAttributes[attributeName].value
        }
      })
    }
  })
}

export const mapLegacySysInfoRecords = (records: any) => {
  return records.map((record: any) => {
    return {
      id: record.get('id'),
      addresses: record.get('addresses'),
      role: record.get('role'),
      groups: record.get('groups'),
      database: record.get('database')
    }
  })
}

export const flattenAttributes = (data: any) => {
  if (data && data.attributes) {
    return Object.assign(
      {},
      ...data.attributes.map(({ name, value }: any) => ({
        [name]: itemIntToString(value, {
          intChecker: neo4j.isInt,
          intConverter: (val: any) => val.toString(),
          objectConverter: extractFromNeoObjects
        })
      }))
    )
  } else {
    return {}
  }
}

export function buildTableData(data: any) {
  if (!data) return null
  return data.map((props: any) => {
    const { value } = props
    if (value instanceof Array) {
      return value.map(v => {
        const key = props.label ? props.label : toKeyString(v.join(''))
        return <SysInfoTableEntry key={key} values={v} />
      })
    }
    return <SysInfoTableEntry key={props.label} {...props} />
  })
}
