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
import { render } from '@testing-library/react'
import neo4j from 'neo4j-driver'
import React from 'react'

import {
  CodeStatusbarComponent as CodeStatusbar,
  CodeViewComponent as CodeView
} from './CodeView'

describe('CodeViews', () => {
  describe('CodeView', () => {
    test('displays nothing if not successful query', () => {
      // Given
      const props = { request: { status: 'error' } }

      // When
      const { container } = render(<CodeView {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
    test('displays request and response info if successful query', () => {
      // Given
      const props = {
        query: 'MATCH xx0',
        request: {
          status: 'success',
          result: {
            summary: {
              server: {
                version: 'xx1',
                address: 'xx2'
              }
            },
            records: [{ res: 'xx3' }]
          }
        }
      }

      // When
      const { container } = render(<CodeView {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
  })
  describe('CodeStatusbar', () => {
    test('displays no statusBarMessage', () => {
      // Given
      const props = { result: null, maxRows: 0, maxFieldItems: 0 }

      // When
      const { container } = render(<CodeStatusbar {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
    test('displays statusBarMessage', () => {
      // Given
      const props = {
        query: 'MATCH xx0',
        status: 'success',
        result: {
          summary: {
            resultAvailableAfter: neo4j.int(5),
            resultConsumedAfter: neo4j.int(5)
          } as any,
          records: [{ res: 'xx3' }] as any
        },
        maxRows: 100,
        maxFieldItems: 0
      }

      // When
      const { container } = render(<CodeStatusbar {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
  })
})
