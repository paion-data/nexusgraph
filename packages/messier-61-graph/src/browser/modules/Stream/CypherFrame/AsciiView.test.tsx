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
  AsciiStatusbarComponent as AsciiStatusbar,
  AsciiViewComponent as AsciiView
} from './AsciiView'

describe('AsciiViews', () => {
  describe('AsciiView', () => {
    test('displays bodyMessage if no rows', () => {
      // Given
      const sps = jest.fn()
      const result: any = {
        records: [],
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        }
      }

      // When
      const { container } = render(
        <AsciiView
          setAsciiMaxColWidth={sps}
          result={result}
          maxRows={5}
          maxFieldItems={5}
        />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
    test('does not display bodyMessage if rows', () => {
      // Given
      const sps = jest.fn()
      const result: any = {
        records: [{ keys: ['x'], _fields: ['y'], get: () => 'y' }],
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        }
      }

      // When
      const { container } = render(
        <AsciiView
          setAsciiMaxColWidth={sps}
          result={result}
          maxRows={5}
          maxFieldItems={5}
        />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
  })
  describe('AsciiStatusbar', () => {
    test('displays statusBarMessage if no rows', () => {
      // Given
      const sps = jest.fn()
      const result: any = {
        records: [],
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        }
      }

      // When
      const { container } = render(
        <AsciiStatusbar
          setAsciiSetColWidth={sps}
          result={result}
          maxRows={5}
          maxFieldItems={5}
        />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
    test('displays statusBarMessage if no rows', () => {
      // Given
      const sps = jest.fn()
      const result: any = {
        records: [{ keys: ['x'], _fields: ['y'], get: () => 'y' }],
        summary: {
          resultAvailableAfter: neo4j.int(5),
          resultConsumedAfter: neo4j.int(5)
        }
      }

      // When
      const { container } = render(
        <AsciiStatusbar
          setAsciiSetColWidth={sps}
          result={result}
          maxRows={5}
          maxFieldItems={5}
        />
      )

      // Then
      expect(container).toMatchSnapshot()
    })
  })
})
