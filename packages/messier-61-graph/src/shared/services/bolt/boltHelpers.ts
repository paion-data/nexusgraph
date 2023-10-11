// Copyright 2023 Paion Data. All rights reserved.
import { Session } from 'neo4j-driver'

import { parseURLWithDefaultProtocol } from 'services/utils'

export const KERBEROS = 'KERBEROS'
export const NATIVE = 'NATIVE'
export const NO_AUTH = 'NO_AUTH'
export const SSO = 'SSO'

export const getDiscoveryEndpoint = (url?: string): string => {
  const defaultEndpoint = 'http://localhost/'
  if (!url) {
    return defaultEndpoint
  }

  const info = parseURLWithDefaultProtocol(url)
  return info ? `${info.protocol}//${info.host}/` : defaultEndpoint
}

export const isConfigValTruthy = (val: boolean | string | number): boolean =>
  [true, 'true', 'yes', 1, '1'].indexOf(val) > -1
export const isConfigValFalsy = (val: boolean | string | number): boolean =>
  [false, 'false', 'no', 0, '0'].indexOf(val) > -1

export const buildTxFunctionByMode = (session?: Session) => {
  if (!session) {
    return null
  }
  return (session as any)._mode !== 'READ'
    ? session.writeTransaction.bind(session)
    : session.readTransaction.bind(session)
}
