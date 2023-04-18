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
import reducer, {
  ENSURE_MAX_FRAMES,
  EnsureMaxFramesAction,
  FramesState,
  add,
  initialState
} from './framesDuck'

describe('framesDuck', () => {
  test('can limit frames count', () => {
    // Given
    const init: FramesState = {
      ...initialState,
      allIds: ['1', '2'],
      byId: {
        1: { isPinned: false, stack: [] },
        2: { isPinned: false, stack: [] }
      }
    }
    const action: EnsureMaxFramesAction = {
      type: ENSURE_MAX_FRAMES,
      maxFrames: 1
    }

    // When
    const newState = reducer(init, action)

    // Then
    const expectedState: FramesState = {
      ...init,
      allIds: ['1'],
      byId: { 1: { isPinned: false, stack: [] } }
    }
    expect(newState.allIds.length).toBe(1)
    expect(newState).toEqual(expectedState)
  })
  test('dont remove pinned frames when cutting frames', () => {
    // Given
    const byId = {
      1: { stack: [], isPinned: true },
      2: { stack: [], isPinned: true }
    }
    const init: FramesState = { ...initialState, allIds: ['1', '2'], byId }
    const action: EnsureMaxFramesAction = {
      type: ENSURE_MAX_FRAMES,
      maxFrames: 1
    }

    // When
    const newState = reducer(init, action)

    // Then
    expect(newState.allIds.length).toBe(2)
    expect(newState).toEqual(init)
  })
  test('saves a stack of same ids', () => {
    const ID = 'test-id'
    const BEFORE = 'before'
    const AFTER = 'after'
    const byId = { [ID]: { stack: [{ type: BEFORE }] }, 2: { stack: [{}] } }
    const init: any = { ...initialState, allIds: [ID, '2'], byId }
    const action = add({ id: ID, type: AFTER } as any)

    // Then
    expect(init.byId).toMatchInlineSnapshot(`
      Object {
        "2": Object {
          "stack": Array [
            Object {},
          ],
        },
        "test-id": Object {
          "stack": Array [
            Object {
              "type": "before",
            },
          ],
        },
      }
    `)
    // When
    const newState = reducer(init, action)

    // Then
    expect(newState.allIds.length).toBe(2)
    expect(newState.byId).toMatchInlineSnapshot(`
      Object {
        "2": Object {
          "stack": Array [
            Object {},
          ],
        },
        "test-id": Object {
          "stack": Array [
            Object {
              "history": Array [],
              "id": "test-id",
              "type": "after",
            },
            Object {
              "type": "before",
            },
          ],
        },
      }
    `)
  })
})
