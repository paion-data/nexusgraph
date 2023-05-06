// Copyright 2023 Paion Data. All rights reserved.
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
