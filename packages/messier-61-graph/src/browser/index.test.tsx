// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import AppInit from './AppInit'

describe('browser entry', () => {
  it('renders', () => {
    render(<AppInit />)
  })
})
