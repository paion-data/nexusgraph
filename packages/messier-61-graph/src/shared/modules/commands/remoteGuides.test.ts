// Copyright 2023 Paion Data. All rights reserved.
import { createEpicMiddleware } from 'redux-observable'
import { createBus } from 'suber'

import {
  fetchGuideFromAllowlistAction,
  fetchGuideFromAllowlistEpic
} from './commandsDuck'

jest.mock('services/remote', () => {
  const orig = jest.requireActual('services/remote')
  return {
    ...orig,
    get: jest.fn()
  }
})
const remote = jest.requireMock('services/remote')

jest.mock('shared/modules/dbMeta/dbMetaDuck', () => {
  const orig = jest.requireActual('shared/modules/dbMeta/dbMetaDuck')
  return {
    ...orig,
    getRemoteContentHostnameAllowlist: jest.fn(),
    getDefaultRemoteContentHostnameAllowlist: jest.fn()
  }
})
const dbMeta = jest.requireMock('shared/modules/dbMeta/dbMetaDuck')

describe('fetchGuideFromAllowlistEpic', () => {
  afterEach(() => {
    remote.get.mockReset()
    dbMeta.getRemoteContentHostnameAllowlist.mockReset()
    dbMeta.getDefaultRemoteContentHostnameAllowlist.mockReset()
  })

  it('resolves * to default allowlist when looking for a guide', done => {
    // Given
    const bus = createBus()
    bus.applyReduxMiddleware(createEpicMiddleware(fetchGuideFromAllowlistEpic))
    remote.get.mockImplementation(() => Promise.reject(new Error('test')))
    dbMeta.getRemoteContentHostnameAllowlist.mockImplementation(() => '*')
    dbMeta.getDefaultRemoteContentHostnameAllowlist.mockImplementation(
      () => 'testurl1.test, testurl2.test'
    )
    const $$responseChannel = 'test-channel'
    const action: any = fetchGuideFromAllowlistAction('reco')
    action.$$responseChannel = $$responseChannel
    bus.one($$responseChannel, () => {
      // Then
      expect(dbMeta.getRemoteContentHostnameAllowlist).toHaveBeenCalledTimes(1)
      expect(
        dbMeta.getDefaultRemoteContentHostnameAllowlist
      ).toHaveBeenCalledTimes(1)
      expect(remote.get).toHaveBeenCalledWith('http://testurl1.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledWith('https://testurl1.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledWith('http://testurl2.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledWith('https://testurl2.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledTimes(4) // 2 times per hostname
      done()
    })
    bus.send(action.type, action)
  })
  it('does not change behavior when * isnt involved', done => {
    // Given
    const bus = createBus()
    bus.applyReduxMiddleware(createEpicMiddleware(fetchGuideFromAllowlistEpic))
    remote.get.mockImplementation(() => Promise.reject(new Error('test')))
    dbMeta.getRemoteContentHostnameAllowlist.mockImplementation(
      () => 'configurl1.test'
    )

    dbMeta.getDefaultRemoteContentHostnameAllowlist.mockImplementation(
      () => 'test1.test, test2.test'
    )
    const $$responseChannel = 'test-channel'
    const action: any = fetchGuideFromAllowlistAction('reco')
    action.$$responseChannel = $$responseChannel
    bus.one($$responseChannel, () => {
      // Then
      expect(dbMeta.getRemoteContentHostnameAllowlist).toHaveBeenCalledTimes(1)
      expect(
        dbMeta.getDefaultRemoteContentHostnameAllowlist
      ).toHaveBeenCalledTimes(1)
      expect(remote.get).toHaveBeenCalledWith('http://configurl1.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledWith('https://configurl1.test/reco', {
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      })
      expect(remote.get).toHaveBeenCalledTimes(2)
      done()
    })
    bus.send(action.type, action)
  })
})
