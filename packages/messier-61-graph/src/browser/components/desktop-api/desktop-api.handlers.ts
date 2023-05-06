// Copyright 2023 Paion Data. All rights reserved.
import {
  createConnectionCredentialsObject,
  getActiveGraph
} from './desktop-api.utils'

export const buildConnectionCreds = async (
  _event?: any,
  context?: any,
  _oldContext?: any,
  getKerberosTicket?: any,
  extra: any = {}
) => {
  const activeGraph = getActiveGraph(context) || {}
  const connectionsCredentialsObject = await createConnectionCredentialsObject(
    activeGraph,
    extra.defaultConnectionData,
    getKerberosTicket
  )
  // No connection. Probably no graph active.
  if (!connectionsCredentialsObject) {
    throw new Error('No connection creds found')
  }
  return connectionsCredentialsObject
}

export const getDesktopTheme = (_?: any, newContext?: any) => {
  if (newContext.global && newContext.global.prefersColorScheme) {
    return Promise.resolve(newContext.global.prefersColorScheme)
  }
  return Promise.resolve(null)
}
