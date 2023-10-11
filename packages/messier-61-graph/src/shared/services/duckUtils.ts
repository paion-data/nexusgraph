// Copyright 2023 Paion Data. All rights reserved.

export const hydrate = (initialState: any, state: any) => {
  if (!state) return state
  return state.hydrated ? state : { ...initialState, ...state, hydrated: true }
}

export const dehydrate = (state: any) => {
  if (state) {
    delete state.hydrated
  }
  return state
}
