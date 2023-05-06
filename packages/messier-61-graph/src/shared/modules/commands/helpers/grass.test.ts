// Copyright 2023 Paion Data. All rights reserved.
import { fetchRemoteGrass } from './grass'
import { parseGrass } from 'shared/services/grassUtils'

jest.mock('services/remote', () => {
  return {
    get: (url: any) => {
      return new Promise(resolve => {
        resolve(url)
      })
    }
  }
})

describe('Grass remote fetch', () => {
  test('should not fetch from url not in the allowlist', () => {
    const allowlist: any = 'http://foo'
    const urlNotInAllowlist = 'http://bar'
    return expect(
      fetchRemoteGrass(urlNotInAllowlist, allowlist)
    ).rejects.toMatchObject(
      new Error('Hostname is not allowed according to server allowlist')
    )
  })
  test('should fetch from url in the allowlist', () => {
    const allowlist: any = 'http://foo'
    const urlInAllowlist = 'http://foo'
    return expect(fetchRemoteGrass(urlInAllowlist, allowlist)).resolves.toBe(
      urlInAllowlist
    )
  })
})

describe('Grass parser', () => {
  test('Can parse simple grass data', () => {
    const data = 'node {color: red;} relationship {shaft-width: 10px;}'
    const parsed = parseGrass(data)
    expect(parsed.node.color).toEqual('red')
    expect(parsed.relationship['shaft-width']).toEqual('10px')
  })

  test('Returns empty object on strange data', () => {
    const data = 'this is not grass data! : { . / , > <'
    const parsed = parseGrass(data)
    expect(parsed).toEqual({})
  })

  test('Handles id and type captions correctly', () => {
    const data = `node {caption: {title};}
                node.PERSON {caption: <id>;}
                relationship {caption: <type>;}
                relationship.KNOWS {caption: {how};}`
    const parsed = parseGrass(data)
    expect(parsed.node.caption).toEqual('title')
    expect(parsed['node.PERSON'].caption).toEqual('<id>')
    expect(parsed.relationship.caption).toEqual('<type>')
    expect(parsed['relationship.KNOWS'].caption).toEqual('how')
  })

  test('Parsing does not generate any junk', () => {
    const data = `node {caption: {title};}
                relationship {caption: <type>;}`
    const parsed = parseGrass(data)
    expect(Object.keys(parsed).length).toEqual(2)
    expect(Object.keys(parsed.node).length).toEqual(1)
    expect(Object.keys(parsed.relationship).length).toEqual(1)
  })

  test('Parsing grass with odd whitespace', () => {
    const data =
      'node {border-color : #9AA1AC ; \n\r\t  diameter:50px;color:#A5ABB6; border-width : 2px ; } relationship{ color : #A5ABB6 ; shaft-width : 1px ; font-size : 8px ; padding : 3px ; text-color-external : #000000 ; text-color-internal : #FFFFFF ; caption : <type>; }'
    const parsed = parseGrass(data)
    expect(parsed.node.diameter).toEqual('50px')
    expect(parsed.relationship.color).toEqual('#A5ABB6')
  })

  test('Handles JSON data', () => {
    const data =
      '{"node": {"diameter":"50px", "color":"#A5ABB6"}, "relationship":{"color":"#A5ABB6","shaft-width":"1px"}}'
    const parsed = parseGrass(data)
    expect(parsed.node.diameter).toEqual('50px')
    expect(parsed.relationship.color).toEqual('#A5ABB6')
  })
})
