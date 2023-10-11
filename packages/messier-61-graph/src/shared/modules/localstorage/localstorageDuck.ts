// Copyright 2023 Paion Data. All rights reserved.
import { USER_CLEAR } from 'shared/modules/app/appDuck'
import {
  disconnectAction,
  getActiveConnection
} from 'shared/modules/connections/connectionsDuck'

export const NAME = 'localstorage'
export const CLEAR_LOCALSTORAGE = `${NAME}/CLEAR_LOCALSTORAGE`

// Epics
export const clearLocalstorageEpic = (some$: any, store: any) =>
  some$.ofType(CLEAR_LOCALSTORAGE).map(() => {
    const activeConnection = getActiveConnection(store.getState())
    if (activeConnection) {
      store.dispatch(disconnectAction(activeConnection))
    }
    return { type: USER_CLEAR }
  })
