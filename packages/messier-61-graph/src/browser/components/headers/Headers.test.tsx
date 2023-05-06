// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { H3 } from './Headers'

describe('headers', () => {
  test('H3 renders', () => {
    render(<H3 />)
  })
})
