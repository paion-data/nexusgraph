// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react/pure'
import neo4j from 'neo4j-driver'
import React from 'react'

import { PlanStatusbar, PlanView, PlanViewProps } from './PlanView'

describe('PlanViews', () => {
  describe('PlanView', () => {
    test('displays plan view if it exists', () => {
      // Given
      const props: PlanViewProps = {
        result: {
          summary: {
            plan: {
              dbHits: 'xx0',
              arguments: {},
              children: [],
              operatorType: 'ProduceResults',
              identifiers: ['n']
            }
          }
        },
        updated: 0,
        isFullscreen: false,
        setPlanExpand: () => undefined,
        assignVisElement: () => undefined,
        planExpand: 'EXPAND'
      }

      // When
      const { getByText } = render(<PlanView {...props} />)

      // Then
      expect(getByText('ProduceResults'))
    })
  })
  describe('PlanStatusbar', () => {
    test('displays statusBarMessage', () => {
      // Given
      const props = {
        result: {
          summary: {
            resultAvailableAfter: neo4j.int(100),
            resultConsumedAfter: neo4j.int(20),
            profile: {
              children: [],
              arguments: {
                operatorType: {},
                version: 'xx0',
                planner: 'xx1',
                runtime: 'xx2',
                children: []
              },
              dbHits: 'xx3'
            }
          }
        },
        setPlanExpand: () => undefined
      }

      // When
      const { getByText } = render(<PlanStatusbar {...props} />)

      // Then
      expect(getByText(/xx0/))
      expect(getByText(/xx1/))
      expect(getByText(/xx2/))
      expect(getByText(/xx3/))
    })
  })
})
