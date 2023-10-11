// Copyright 2023 Paion Data. All rights reserved.
import { act, renderHook } from '@testing-library/react-hooks'
import mockDate from 'mockdate'

import { useSlowConnectionState } from '../main.hooks'
import { DISCONNECTED_STATE } from 'shared/modules/connections/connectionsDuck'

mockDate.set(0)
jest.useFakeTimers()

describe('main.hooks', () => {
  afterAll(() => {
    mockDate.reset()
  })

  describe('DISCONNECTED_STATE', () => {
    beforeAll(() => {
      mockDate.set(0)
    })

    const initialProps = {
      connectionState: DISCONNECTED_STATE,
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

    test('after 6000ms, should continue to return [false, false]', () => {
      act(() => {
        mockDate.set(6000)
        jest.advanceTimersByTime(6000)

        expect(result.current).toEqual([false, false])
      })
    })

    test('after 12000ms, should continue to return [false, false]', () => {
      act(() => {
        mockDate.set(12000)
        jest.advanceTimersByTime(6000)

        expect(result.current).toEqual([false, false])
      })
    })
  })
})
