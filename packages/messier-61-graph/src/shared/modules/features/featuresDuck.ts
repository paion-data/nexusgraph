// Copyright 2023 Paion Data. All rights reserved.
import { APP_START, CLOUD, DESKTOP } from 'shared/modules/app/appDuck'
import { DISCONNECTION_SUCCESS } from 'shared/modules/connections/connectionsDuck'

export const NAME = 'features'
const CLEAR = 'features/CLEAR'
export const UPDATE_USER_CAPABILITIES = 'features/UPDATE_USER_CAPABILITIES'
export const DETECTED_CLIENT_CONFIG = 'features/DETECTED_CLIENT_CONFIG'

export const hasClientConfig = (state: any) => state[NAME].clientConfig
export const utilizeBrowserSync = (state: any) => !!state[NAME].browserSync
export const getUserCapabilities = (state: any) => state[NAME].userCapabilities

export const USER_CAPABILITIES = {
  serverConfigReadable: 'serverConfigReadable'
}

export const initialState = {
  browserSync: true,
  clientConfig: null,
  userCapabilities: {
    [USER_CAPABILITIES.serverConfigReadable]: false
  }
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case APP_START:
      return {
        ...initialState,
        ...state,
        browserSync: shouldUtilizeBrowserSync(action)
      }
    case DETECTED_CLIENT_CONFIG:
      return { ...state, clientConfig: action.isAvailable }
    case UPDATE_USER_CAPABILITIES:
      return {
        ...state,
        userCapabilities: {
          ...state.userCapabilities,
          [action.capabilityName]: action.capabilityValue
        }
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}

// Helper functions
const shouldUtilizeBrowserSync = (action: any) => {
  return ![DESKTOP, CLOUD].includes(action.env)
}

export const updateUserCapability = (
  capabilityName: any,
  capabilityValue: any
) => {
  return {
    type: UPDATE_USER_CAPABILITIES,
    capabilityName,
    capabilityValue
  }
}

export const setClientConfig = (isAvailable: any) => {
  return {
    type: DETECTED_CLIENT_CONFIG,
    isAvailable
  }
}

export const clearOnDisconnectEpic = (some$: any) =>
  some$.ofType(DISCONNECTION_SUCCESS).mapTo({ type: CLEAR })
