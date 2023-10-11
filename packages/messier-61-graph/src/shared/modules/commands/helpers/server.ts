// Copyright 2023 Paion Data. All rights reserved.
import { clearRefreshTokenData } from 'neo4j-client-sso'

import { getCommandAndParam } from 'services/commandUtils'
import { UnknownCommandError } from 'services/exceptions'
import * as connections from 'shared/modules/connections/connectionsDuck'
import { shouldRetainConnectionCredentials } from 'shared/modules/dbMeta/dbMetaDuck'
import { add as addFrameAction } from 'shared/modules/frames/framesDuck'

export function handleServerCommand(action: any, put: any, store: any) {
  const [serverCmd, props] = getCommandAndParam(action.cmd.substr(1))

  if (serverCmd === 'connect') {
    return connect(action, put, store)
  }
  if (serverCmd === 'disconnect') {
    clearRefreshTokenData()
    return handleDisconnectCommand(action, put)
  }
  if (serverCmd === 'user') {
    return handleUserCommand(action, props)
  }
  if (serverCmd === 'change-password') {
    return handleChangePasswordCommand(action)
  }
  if (serverCmd === 'status') {
    return handleServerStatusCommand(action)
  }
  if (serverCmd === 'switch') {
    return handleServerSwitchCommand(action, props, store)
  }
  return {
    ...action,
    type: 'error',
    error: UnknownCommandError({ cmd: action.cmd })
  }
}

function handleDisconnectCommand(action: any, put: any) {
  put(addFrameAction({ ...action, type: 'disconnect' }))
  const disconnectAction = connections.disconnectAction()
  put(disconnectAction)
  return null
}

function handleUserCommand(action: any, props: any) {
  switch (props) {
    case 'list':
      return { ...action, type: 'user-list' }
    case 'add':
      return { ...action, type: 'user-add' }
  }
}

function handleChangePasswordCommand(action: any) {
  return { ...action, type: 'change-password' }
}

function connect(action: any, _put: any, store: any) {
  const connectionData = connections.getActiveConnectionData(store.getState())
  return { ...action, type: 'connection', connectionData }
}

function handleServerStatusCommand(action: any) {
  return { ...action, type: 'status' }
}

function handleServerSwitchCommand(action: any, props: any, store: any) {
  switch (props) {
    case 'success':
      const activeConnectionData = connections.getActiveConnectionData(
        store.getState()
      )
      const storeCredentials = shouldRetainConnectionCredentials(
        store.getState()
      )
      return {
        ...action,
        type: 'switch-success',
        activeConnectionData,
        storeCredentials
      }
    case 'fail':
      return { ...action, type: 'switch-fail' }
  }
}
