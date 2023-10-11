// Copyright 2023 Paion Data. All rights reserved.
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
