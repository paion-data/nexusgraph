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
import uuid from 'uuid'

import reducer, * as favorites from './favoritesDuck'

describe('favorites reducer', () => {
  test('should allow id to be injected when adding a favorite', () => {
    const nextState = reducer([], favorites.addFavorite('bar', 'foo'))
    expect(nextState.length).toBe(1)

    const actual = nextState[0]
    expect(actual.id).toEqual('foo')
    expect(actual.content).toEqual('bar')
  })
  test('should generate an id when adding a favorite and only passing cmd value', () => {
    const nextState = reducer([], favorites.addFavorite('bar'))
    expect(nextState.length).toBe(1)

    const actual = nextState[0]
    expect(actual.id).not.toBeFalsy()
    expect(actual.content).toEqual('bar')
  })

  test('should update state for favorites when favorite is removed and only one item is in the list', () => {
    const nextState = reducer(
      [{ id: 'a', content: 'foo' }],
      favorites.removeFavorites(['a'])
    )
    expect(nextState).toEqual([])
  })

  test('should update state for favorites when favorite is removed when there is more than one item in the list', () => {
    const favoriteScript1 = {
      id: uuid.v4(),
      content: 'match (n) return n limit 1'
    }
    const favoriteScript2 = {
      id: uuid.v4(),
      content: 'match (a) return a'
    }
    const favoriteScript3 = {
      id: uuid.v4(),
      content: 'match (a) return a'
    }
    const initialState = [favoriteScript1, favoriteScript2, favoriteScript3]
    const nextState = reducer(
      initialState,
      favorites.removeFavorite(favoriteScript2.id)
    )
    expect(nextState).toEqual([favoriteScript1, favoriteScript3])
  })
  test('should return favorite by id', () => {
    const script = {
      id: uuid.v4(),
      content: 'match (n) return n limit 1'
    }

    const nextState = reducer([script], favorites.addFavorite('foo', 'b'))
    expect(favorites.getFavorite(nextState, script.id)).toEqual(script)
    expect(favorites.getFavorite(nextState, 'b')).toEqual({
      id: 'b',
      content: 'foo'
    })
  })
  test('should update favorite by id', () => {
    const favoriteScript1 = {
      id: uuid.v4(),
      content: 'match (n) return n limit 1'
    }
    const favoriteScript2 = {
      id: uuid.v4(),
      content: 'match (a) return a'
    }
    const initialState = [favoriteScript1, favoriteScript2]
    const newContent = '//Foobar'
    const nextState = reducer(
      initialState,
      favorites.updateFavoriteContent(favoriteScript1.id, newContent)
    )
    expect(favorites.getFavorite(nextState, favoriteScript1.id)).toEqual({
      ...favoriteScript1,
      content: newContent
    })
    expect(favorites.getFavorite(nextState, favoriteScript2.id)).toEqual(
      favoriteScript2
    )
  })
})

describe('favorites actions', () => {
  test('should handle loading favorites', () => {
    const favs = [{ id: 'abc', content: 'abc' }]
    const expected = {
      type: favorites.LOAD_FAVORITES,
      favorites: favs
    }
    expect(favorites.loadFavorites(favs)).toEqual(expected)
  })
  test('should handle removing favorite', () => {
    const id = uuid.v4()
    const expected = {
      type: favorites.REMOVE_FAVORITE,
      id
    }
    expect(favorites.removeFavorite(id)).toEqual(expected)
  })
})
