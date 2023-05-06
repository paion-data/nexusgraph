// Copyright 2023 Paion Data. All rights reserved.
import { buildTxFunctionByMode } from './boltHelpers'

const WRITE = 'WRITE'
const READ = 'READ'

describe('buildTxFunctionByMode', () => {
  test('it returns WRITE tx when in WRITE mode', () => {
    // Given
    const fakeSession: any = {
      _mode: WRITE,
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(0)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(1)
  })
  test('it returns READ tx when in READ mode', () => {
    // Given
    const fakeSession: any = {
      _mode: READ,
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(1)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(0)
  })
  test('it by DEFAULT returns tx in WRITE mode', () => {
    // Given
    const fakeSession: any = {
      readTransaction: jest.fn(),
      writeTransaction: jest.fn()
    }

    // When
    const txFn = buildTxFunctionByMode(fakeSession)
    txFn!(() => {})

    // Then
    expect(fakeSession.readTransaction).toHaveBeenCalledTimes(0)
    expect(fakeSession.writeTransaction).toHaveBeenCalledTimes(1)
  })
  test('it returns null if no session passed', () => {
    // Given
    const fakeSession = undefined

    // When
    const txFn = buildTxFunctionByMode(fakeSession)

    // Then
    expect(txFn).toBeNull()
  })
})
