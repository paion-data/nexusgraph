// Copyright 2023 Paion Data. All rights reserved.
import * as utils from './remoteUtils'

describe('remoteUtils', () => {
  test('removes script tags', () => {
    const text = 'hello<script>alert(1)</script> <p onclick="alert(1)">test</p>'
    expect(utils.cleanHtml(text)).toEqual('hello <p>test</p>')
  })
  test('removes script from href', () => {
    const doubleQuoted = 'hello <a href="javascript:alert(1)">test</a>'
    expect(utils.cleanHtml(doubleQuoted)).toEqual('hello <a href="">test</a>')

    const singleQuoted = "hello <a href='javascript:alert(1)'>test</a>"
    expect(utils.cleanHtml(singleQuoted)).toEqual("hello <a href=''>test</a>")
  })
  test('removes on* handlers from html', () => {
    const text = 'hello <div onclick="foobar">test</div>'
    expect(utils.cleanHtml(text)).toEqual('hello <div>test</div>')
  })
  test('isLocalRequest figures out if a request is local or remote', () => {
    // Given
    const itemsStrict = [
      { local: undefined, request: '/yo', expect: false },
      { local: 'http://hej.com', request: '/yo', expect: true },
      { local: 'http://hej.com', request: 'http://hej.com/yo', expect: true },
      {
        local: 'http://hej.com:8080',
        request: 'http://hej.com:9000/mine',
        expect: false
      },
      { local: 'http://hej.com', request: 'https://hej.com', expect: false },
      { local: 'http://hej.com', request: 'http://bye.com', expect: false }
    ]
    const itemsHostnameOnly = [
      { local: undefined, request: '/yo', expect: false },
      { local: 'http://hej.com', request: '/yo', expect: true },
      { local: 'http://hej.com', request: 'http://hej.com/yo', expect: true },
      {
        local: 'http://hej.com:8080',
        request: 'http://hej.com:9000/mine',
        expect: true
      },
      { local: 'http://hej.com', request: 'https://hej.com', expect: true },
      { local: 'http://hej.com', request: 'http://bye.com', expect: false },
      {
        local: 'bolt://hej.com:7687',
        request: 'http://hej.com:7474',
        expect: true
      }
    ]

    // When && Then
    itemsStrict.forEach(item => {
      expect(utils.isLocalRequest(item.local, item.request)).toBe(item.expect)
    })
    itemsHostnameOnly.forEach(item => {
      expect(
        utils.isLocalRequest(item.local, item.request, { hostnameOnly: true })
      ).toBe(item.expect)
    })
  })
})
