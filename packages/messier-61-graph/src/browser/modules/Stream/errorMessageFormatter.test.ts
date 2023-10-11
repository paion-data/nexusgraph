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
import { errorMessageFormater } from './errorMessageFormater'

describe('errorsHelper', () => {
  test('should return error code as code and message when message is missing', () => {
    const errorCode = 0
    const error = errorMessageFormater(errorCode)

    expect(error.title.trim()).toEqual(errorCode.toString())
    expect(error.message.trim()).toEqual(errorCode.toString())
  })
  test('should return error code and message', () => {
    const errorCode = 0
    const errorText = 'foobar'
    const error = errorMessageFormater(errorCode, errorText)

    expect(error.title.trim()).toContain(errorCode.toString())
    expect(error.title.trim()).toContain(errorText)
    expect(error.message.trim()).toContain(errorText)
  })
  test('should only return error message when error code is missing', () => {
    const errorCode = null
    const errorText = 'foobar'
    const error = errorMessageFormater(errorCode, errorText)

    expect(error.title).toBe(errorText)
    expect(error.message).toBe(errorText)
  })
})
