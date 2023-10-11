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
import { validateConnection } from './boltConnection'

describe('validateConnection', () => {
  it('should reject if driver is `null`', () => {
    // validate can be called before driver is in store, which used to result in a `TypeError: Cannot read property 'supportsMultiDb' of null` error,
    // reject if driver is null is a fix to not have that error in console
    const driver = null
    const resolve = jest.fn()
    const reject = jest.fn()

    validateConnection(driver, resolve, reject)

    expect(resolve).not.toHaveBeenCalled()
    expect(reject).toHaveBeenCalled()
  })
})
