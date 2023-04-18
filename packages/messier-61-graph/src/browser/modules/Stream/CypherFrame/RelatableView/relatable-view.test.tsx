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
  RelatableStatusbarComponent as RelatableStatusbar,
  RelatableViewComponent as RelatableView
} from './relatable-view'

describe('RelatableViews', () => {
  describe('RelatableView', () => {
    test('displays bodyMessage if no rows', () => {
      // Given
      const props = {
        result: {
          records: [],
          summary: {
            resultAvailableAfter: neo4j.int(5),
            resultConsumedAfter: neo4j.int(5)
          } as any
        }
      }

      // When
      const { container } = render(
        <RelatableView {...props} maxFieldItems={1000} maxRows={1000} />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
    test('does not display bodyMessage if rows, and escapes HTML', () => {
      const value = 'String with HTML <strong>in</strong> it'
      const result = {
        records: [{ keys: ['x'], _fields: [value], get: () => value }] as any,
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        } as any
      }

      // When
      const { container } = render(
        <RelatableView result={result} maxFieldItems={1000} maxRows={1000} />
      )

      // Then
      expect(container).toMatchSnapshot()
    })

    test('does not crash if key is empty string', () => {
      const value = 'String value'
      const result = {
        records: [{ keys: [``], _fields: [value], get: () => value }] as any,
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        } as any
      }

      // When
      const { container } = render(
        <RelatableView result={result} maxFieldItems={1000} maxRows={1000} />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
  })
  describe('TableStatusbar', () => {
    test('displays no statusBarMessage', () => {
      // Given
      const props = { result: null, maxRows: 0 }

      // When
      const { container } = render(
        <RelatableStatusbar {...props} maxFieldItems={1000} maxRows={1000} />
      )

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
          maxRows: 100,
          records: [{ res: 'xx3' }] as any
        }
      }

      // When
      const { container } = render(
        <RelatableStatusbar {...props} maxFieldItems={1000} maxRows={1000} />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
  })
})
