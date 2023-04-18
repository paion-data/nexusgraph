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
import asTitleString from './titleStringBuilder'

describe('asTitleString', () => {
  test('should return static copy if there is no connectionData', () => {
    // Given
    const connectionData = null

    // When
    const title = asTitleString(connectionData)

    // Then
    expect(title).toBe('Neo4j Browser')
  })
  test('should return static copy if there is connectionData but values are both falsy', () => {
    // Given
    const username = undefined
    const host = null
    const connectionData = { username, host }

    // When
    const title = asTitleString(connectionData)

    // Then
    expect(title).toBe('Neo4j Browser')
  })
  test('should return host + static copy if there is connectionData host', () => {
    // Given
    const username = undefined
    const host = 'foo'
    const connectionData = { username, host }

    // When
    const title = asTitleString(connectionData)

    // Then
    expect(title).toBe(`${host} - Neo4j Browser`)
  })
  test('should return username + static copy if there is connectionData host', () => {
    // Given
    const username = 'foo'
    const host = undefined
    const connectionData = { username, host }

    // When
    const title = asTitleString(connectionData)

    // Then
    expect(title).toBe(`${username} - Neo4j Browser`)
  })
  test('should return string with username and host from connectionData', () => {
    // Given
    const username = 'foo'
    const host = 'bar'
    const connectionData = { username, host }

    // When
    const title = asTitleString(connectionData)

    // Then
    expect(title).toContain(`${username}@${host}`)
  })
})
