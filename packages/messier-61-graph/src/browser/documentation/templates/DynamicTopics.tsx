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

import { transformHelpTopicToCommand } from 'services/commandUtils'

// Avoid duplication and don't list error-pages
const unlistedCommands = [
  'unfound',
  'unknown',
  'help',
  'movies',
  'northwind',
  'guides'
]

const categorize = (commands: any) => {
  const categories: Record<string, any> = {
    browserUiCommands: { title: 'Browser UI Commands' },
    boltProtocol: { title: 'Bolt Protocol' },
    cypherQueries: { title: 'Cypher Queries' },
    executionPlans: { title: 'Execution Plans' },
    cypherHelp: { title: 'Cypher Help' },
    schemaClauses: { title: 'Schema Clauses' },
    administration: { title: 'Administration' },
    security: { title: 'Security' },
    cypherPredicates: { title: 'Cypher Predicates' },
    restApiCommands: { title: 'Rest API Commands' },
    guides: { title: 'Guides' },
    graphExamples: { title: 'Graph Examples' },
    undefined: { title: 'Other' }
  }

  Object.entries(commands).forEach((command: [string, any]) => {
    const value = command[1]
    const cmd = transformHelpTopicToCommand(command[0])

    if (unlistedCommands.includes(cmd)) {
      return
    }

    const newValue = {
      command: cmd,
      title: value.title
    }

    if (value.category && categories[value.category]) {
      if (!(categories[value.category] || {}).entries) {
        categories[value.category].entries = []
      }
      categories[value.category].entries.push(newValue)
    } else {
      if (!(categories.undefined || {}).entries) {
        categories.undefined.entries = []
      }
      categories.undefined.entries.push(newValue)
    }
  })

  return Object.entries(categories)
    .filter(category => (category[1].entries || []).length)
    .map(category => category[1])
}

const Entry = ({ type, command }: any) => {
  const topic = type === 'play' ? 'play' : 'help'
  const attrs = { [`${topic}-topic`]: command.command }
  return (
    <tr>
      <th>{command.title}</th>
      <td>
        <a {...attrs}>{`:${topic} ${command.command}`}</a>
      </td>
    </tr>
  )
}

const Section = ({ section, type, i }: any) => {
  return (
    <>
      <tr className="table-help--subheader">
        <th>{section.title}</th>
        <th />
      </tr>
      {section.entries.map((command: any, k: any) => (
        <Entry
          key={`${command.title}-${i}-${k}`}
          type={type}
          command={command}
        />
      ))}
    </>
  )
}

const Categories = ({ types, type, i }: any) => {
  const showCategoryHeadline = !!Object.keys(types).length
  return (
    <>
      {showCategoryHeadline && (
        <tr className="table-help--header">
          <th>{types[type].title}</th>
          <th />
        </tr>
      )}
      {types[type].categories.map((section: any, j: any) => (
        <Section
          key={`${type}-${i}-${j}`}
          section={section}
          type={type}
          i={i}
        />
      ))}
    </>
  )
}

type DynamicTopicsProps = {
  description: string
  footer: string
  filter: any[]
  docs: any
}
export const DynamicTopics = ({
  docs = {},
  description = '',
  footer = '',
  filter = []
}: DynamicTopicsProps): JSX.Element => {
  let filteredDocs: any = {}
  if (filter.length) {
    Object.keys(docs)
      .filter(type => filter.includes(type))
      .forEach(type => {
        filteredDocs[type] = docs[type]
      })
  } else {
    filteredDocs = docs
  }

  const types: any = {}
  Object.keys(filteredDocs).forEach(key => {
    const { title, chapters } = filteredDocs[key]
    types[key] = {
      title,
      categories: categorize(chapters)
    }
  })

  return (
    <>
      {description && <>{description}</>}
      {Object.keys(types) && (
        <table className="table-condensed table-help table-help--commands">
          <tbody>
            {Object.keys(types).map((type, i) => (
              <Categories
                key={`${type}-${i}`}
                types={types}
                type={type}
                i={i}
              />
            ))}
          </tbody>
        </table>
      )}
      <div style={{ padding: '20px' }}>{footer && <>{footer}</>}</div>
    </>
  )
}
