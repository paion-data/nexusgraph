// Copyright 2023 Paion Data. All rights reserved.
import { GlobalState } from 'shared/globalState'
import { APP_START } from 'shared/modules/app/appDuck'

export const NAME = 'params'
export const UPDATE_PARAMS = `${NAME}/UPDATE`
const REPLACE = `${NAME}/REPLACE`

const initialState = {}

// Selectors
export const getParams = (state: GlobalState): Record<string, unknown> =>
  state[NAME]

// Reducer
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case APP_START:
      return { ...initialState, ...state }
    case UPDATE_PARAMS:
      return { ...state, ...action.params }
    case REPLACE:
      return { ...action.params }
    default:
      return state
  }
}

// Action creators
export const update = (obj: any) => {
  return {
    type: UPDATE_PARAMS,
    params: obj
  }
}
export const replace = (obj: any) => {
  return {
    type: REPLACE,
    params: obj
  }
}
