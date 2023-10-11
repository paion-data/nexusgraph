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
import { render, screen } from '@testing-library/react'
import React from 'react'

import {
  VersionConditionalDoc,
  VersionConditionalDocProps
} from 'browser-components/VersionConditionalDoc'

const tests: [Omit<VersionConditionalDocProps, 'children'>, boolean][] = [
  [
    { neo4jVersion: '3.5.0', versionCondition: '>=4.3', includeCurrent: true },
    false
  ],
  [
    { neo4jVersion: null, versionCondition: '>=4.3', includeCurrent: true },
    true
  ],
  [
    { neo4jVersion: '4.3.0', versionCondition: '>=4.3', includeCurrent: false },
    true
  ],
  [{ neo4jVersion: null, versionCondition: '', includeCurrent: false }, false],
  [
    {
      neo4jVersion: '4.2.0',
      versionCondition: '>=4.2 <4.3',
      includeCurrent: false
    },
    true
  ]
]

test.each(tests)(
  'Conditionally render element for props %o',
  (props, expected) => {
    render(<VersionConditionalDoc {...props}>Contents</VersionConditionalDoc>)
    const present = screen.queryByText('Contents')
    expect(present !== null).toEqual(expected)
  }
)
