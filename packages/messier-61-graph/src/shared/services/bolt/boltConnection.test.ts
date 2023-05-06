// Copyright 2023 Paion Data. All rights reserved.
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
