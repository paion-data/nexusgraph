// Copyright 2023 Paion Data. All rights reserved.
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import Snake from './Snake'
import { SnakeFrame } from './index'

test('Frame renders', () => {
  const { getByText } = render(<SnakeFrame />)
  const startBtn = getByText(/start the game!/i)
  fireEvent.click(startBtn)
})
test('Extras renders', () => {
  render(<Snake />)
})
