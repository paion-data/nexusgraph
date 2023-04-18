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
import '@testing-library/react-hooks/dont-cleanup-after-each.js'

import { act, renderHook } from '@testing-library/react-hooks'
import mockDate from 'mockdate'

import { useSlowConnectionState } from '../main.hooks'
import { PENDING_STATE } from 'shared/modules/connections/connectionsDuck'

mockDate.set(0)
jest.useFakeTimers()

describe('main.hooks', () => {
  afterAll(() => {
    mockDate.reset()
  })

  describe('PENDING_STATE', () => {
    beforeAll(() => {
      mockDate.set(0)
    })

    const initialProps = {
      connectionState: PENDING_STATE,
      lastConnectionUpdate: 0
    }
    const { result, rerender } = renderHook(useSlowConnectionState, {
      initialProps
    })

    test('should default to [false, false]', () => {
      expect(result.current).toEqual([false, false])
    })

    test('after a rerender with same props, should continue to return [false, false]', () => {
      rerender(initialProps)
      expect(result.current).toEqual([false, false])
    })

    test('after a rerender with updated props, should continue to return [false, false]', () => {
      rerender({ ...initialProps, lastConnectionUpdate: 1 })
      expect(result.current).toEqual([false, false])
    })

    test('after 6000ms, should return [true, false]', () => {
      act(() => {
        mockDate.set(6000)
        jest.advanceTimersByTime(6000)

        expect(result.current).toEqual([true, false])
      })
    })

    test('after 12000ms, should continue to return [true, true]', () => {
      act(() => {
        mockDate.set(12000)
        jest.advanceTimersByTime(6000)

        expect(result.current).toEqual([true, true])
      })
    })
  })
})
