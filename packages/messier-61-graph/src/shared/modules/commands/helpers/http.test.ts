// Copyright 2023 Paion Data. All rights reserved.
import { isValidUrl, parseHttpVerbCommand } from './http'

describe('isValidUrl', () => {
  it('finishes within a second when called with "EnableMultiStatement:true"', () => {
    const start = Date.now()
    const result = isValidUrl('EnableMultiStatement:true')
    const end = Date.now()

    expect(result).toBe(false)
    expect(end - start).toBeLessThan(1000)
  })
})

describe('HTTP verbs command', () => {
  test('Fails with error on wrong command', done => {
    // Given
    const input = 'xxx '

    // When
    const p = parseHttpVerbCommand(input)

    // Then
    p.then(() => {
      expect(1).toBe(2)
      done()
    }).catch(e => {
      expect(e.message).toEqual('Unparseable http request')
      done()
    })
  })
  test('Fails without url', done => {
    // Given
    const input = 'get '

    // When
    const p = parseHttpVerbCommand(input)

    // Then
    p.then(() => {
      expect(1).toBe(2)
      done()
    }).catch(e => {
      expect(e.message).toEqual('Missing path')
      done()
    })
  })
  test('Fails with non JSON data for post/put', done => {
    // Given
    const input = 'post /test my-data'

    // When
    const p = parseHttpVerbCommand(input)

    // Then
    p.then(() => {
      expect(1).toBe(2)
      done()
    }).catch(e => {
      expect(e.message).toEqual('Payload does not seem to be valid (JSON) data')
      done()
    })
  })
  test('Passes post/put without data', done => {
    // Given
    const input = 'post /test'

    // When
    const p = parseHttpVerbCommand(input)

    // Then
    p.then((r: any) => {
      expect(r.method).toBe('post')
      done()
    }).catch(() => {
      expect(1).toEqual(2)
      done()
    })
  })
  test('Passes post/put with JSON data', done => {
    // Given
    const data = '{"x": 1}'
    const input = `post /test ${data}`

    // When
    const p = parseHttpVerbCommand(input)

    // Then
    p.then((r: any) => {
      expect(r.method).toBe('post')
      expect(r.data).toEqual(data)
      done()
    }).catch(() => {
      expect(1).toEqual(2)
      done()
    })
  })
})
