// Copyright 2023 Paion Data. All rights reserved.
import neo4j, { Session } from 'neo4j-driver'
import { v4 } from 'uuid'

import { BoltConnectionError } from '../exceptions'
import { buildTxFunctionByMode } from './boltHelpers'
import { getGlobalDrivers } from './globalDrivers'
import { defaultTxMetadata } from './txMetadata'

const runningQueryRegister: Record<string, (cb?: () => void) => void> = {}

function _trackedTransaction(
  input: string,
  parameters = {},
  session?: Session,
  requestId = null,
  txMetadata = defaultTxMetadata.txMetadata,
  autoCommit = false
): [string, Promise<unknown>] {
  const id = requestId || v4()
  if (!session) {
    return [id, Promise.reject(BoltConnectionError())]
  }
  const closeFn = (cb = (): void => undefined): void => {
    ;(session.close as any)(cb)
    if (runningQueryRegister[id]) delete runningQueryRegister[id]
  }
  runningQueryRegister[id] = closeFn

  const metadata = txMetadata ? { metadata: txMetadata } : undefined

  // Declare variable to store tx function in
  // so we can use same promise chain further down
  // for both types of tx functions
  let runFn

  // Transaction functions are the norm
  if (!autoCommit) {
    const txFn = buildTxFunctionByMode(session)
    // Use same fn signature as session.run
    runFn = (
      input: string,
      parameters: unknown,
      metadata: unknown
    ): Promise<unknown> =>
      txFn!(
        (tx: { run: (input: string, parameters: unknown) => unknown }) =>
          tx.run(input, parameters),
        metadata as any
      )
  } else {
    // Auto-Commit transaction, only used for PERIODIC COMMIT etc.
    runFn = session.run.bind(session)
  }

  const queryPromise = runFn(input, parameters, metadata)
    .then((result: unknown) => {
      closeFn()
      return result
    })
    .catch((e: Error) => {
      closeFn()
      throw e
    })
  return [id, queryPromise]
}

function _transaction(
  input: string,
  parameters: unknown,
  session: any,
  txMetadata = defaultTxMetadata.txMetadata
): Promise<unknown> {
  if (!session) return Promise.reject(BoltConnectionError())

  const metadata = txMetadata ? { metadata: txMetadata } : undefined
  const txFn = buildTxFunctionByMode(session)

  return txFn!((tx: any) => tx.run(input, parameters), metadata)
    .then((r: any) => {
      session.close()
      return r
    })
    .catch((e: any) => {
      session.close()
      throw e
    })
}

export function cancelTransaction(id: string, cb: any): void {
  if (runningQueryRegister[id]) {
    runningQueryRegister[id](cb)
  }
}

export function directTransaction(
  input: string,
  parameters: any,
  opts: any = {}
): Promise<any> | any[] {
  const {
    requestId = null,
    cancelable = false,
    txMetadata = undefined,
    useDb = undefined
  } = opts
  const session = getGlobalDrivers()
    ?.getDirectDriver()
    ?.session({ defaultAccessMode: neo4j.session.WRITE, database: useDb })
  if (!cancelable) return _transaction(input, parameters, session, txMetadata)
  return _trackedTransaction(input, parameters, session, requestId, txMetadata)
}

export function routedReadTransaction(
  input: string,
  parameters: any,
  opts: any = {}
): Promise<any> | any[] {
  const {
    requestId = null,
    cancelable = false,
    txMetadata = undefined,
    useDb = undefined
  } = opts
  const session = getGlobalDrivers()
    ?.getRoutedDriver()
    ?.session({ defaultAccessMode: neo4j.session.READ, database: useDb })
  if (!cancelable) return _transaction(input, parameters, session, txMetadata)
  return _trackedTransaction(input, parameters, session, requestId, txMetadata)
}

export function routedWriteTransaction(
  input: string,
  parameters: any,
  opts: any = {}
): Promise<any> | any[] {
  const {
    requestId = null,
    cancelable = false,
    txMetadata = undefined,
    useDb = undefined,
    autoCommit = false
  } = opts
  const session = getGlobalDrivers()
    ?.getRoutedDriver()
    ?.session({ defaultAccessMode: neo4j.session.WRITE, database: useDb })
  if (!cancelable) return _transaction(input, parameters, session, txMetadata)
  return _trackedTransaction(
    input,
    parameters,
    session,
    requestId,
    txMetadata,
    autoCommit
  )
}
