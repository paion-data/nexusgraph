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
