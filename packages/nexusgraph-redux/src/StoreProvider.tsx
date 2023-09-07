// Copyright 2023 Paion Data. All rights reserved.
import { Provider } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { GlobalState } from "./globalState";
import rootReducers from "./rootReducer";

interface ReduxChildren {
  children: React.ReactNode;
}

const reducer = combineReducers<GlobalState>({ ...(rootReducers as any) });
const store = configureStore({ reducer });

const ReduxStore = ({ children }: ReduxChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStore;
