// Copyright 2023 Paion Data. All rights reserved.
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
