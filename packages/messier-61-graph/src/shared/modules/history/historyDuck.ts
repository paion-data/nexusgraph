// Copyright 2023 Paion Data. All rights reserved.
import { USER_CLEAR } from '../app/appDuck'
import { GlobalState } from 'shared/globalState'

export const NAME = 'history'
export const ADD = 'history/ADD'
export const CLEAR = 'history/CLEAR'

export const getHistory = (state: GlobalState): string[] => state[NAME]

function addHistoryHelper(
  state: string[],
  newState: string,
  maxHistory: number
) {
  // If it's the same as the last entry, don't add it
  if (state && state.length && state[0] === newState) {
    return state
  }
  const newHistory = [...state]
  newHistory.unshift(newState)
  return newHistory.slice(0, maxHistory)
}

export default function (state: string[] = [], action: any) {
  switch (action.type) {
    case ADD:
      return addHistoryHelper(state, action.state, action.maxHistory)
    case CLEAR:
    case USER_CLEAR:
      return []
    default:
      return state
  }
}

export const addHistory = (state: string, maxHistory: number) => {
  return {
    type: ADD,
    state,
    maxHistory
  }
}
export const clearHistory = () => {
  return {
    type: CLEAR
  }
}
