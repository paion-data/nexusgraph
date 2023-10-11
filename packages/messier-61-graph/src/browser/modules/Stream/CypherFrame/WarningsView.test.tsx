// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { WarningsView } from './WarningsView'

describe('WarningsViews', () => {
  describe('WarningsView', () => {
    test('displays nothing if no notifications', () => {
      // Given
      const props = {
        result: {}
      }

      // When
      const { container } = render(<WarningsView {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
    test('does displays a warning', () => {
      // Given
      const props = {
        result: {
          summary: {
            notifications: [
              {
                severity: 'WARNING xx0',
                title: 'My xx1 warning',
                description: 'This is xx2 warning',
                position: {
                  offset: 7,
                  line: 1
                }
              }
            ],
            query: {
              text: 'EXPLAIN MATCH xx3'
            }
          }
        }
      }

      // When
      const { container } = render(<WarningsView {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
    test('does displays multiple warnings', () => {
      // Given
      const props = {
        result: {
          summary: {
            notifications: [
              {
                severity: 'WARNING xx0',
                title: 'My xx1 warning',
                description: 'This is xx2 warning',
                position: {
                  offset: 7,
                  line: 1
                }
              },
              {
                severity: 'WARNING yy0',
                title: 'My yy1 warning',
                description: 'This is yy2 warning',
                position: {
                  offset: 3,
                  line: 1
                }
              }
            ],
            query: {
              text: 'EXPLAIN MATCH zz3'
            }
          }
        }
      }

      // When
      const { container } = render(<WarningsView {...props} />)

      // Then
      expect(container).toMatchSnapshot()
    })
  })
})
