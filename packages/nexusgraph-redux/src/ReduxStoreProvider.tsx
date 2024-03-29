// Copyright 2023 Paion Data. All rights reserved.
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { GlobalState } from "./globalState";
import rootReducers from "./rootReducer";

interface ReduxChildren {
  children: React.ReactNode;
}

const reducer = combineReducers<GlobalState>({ ...(rootReducers as any) });
const store = createStore<GlobalState>(reducer);

const ReduxStoreProvider = ({ children }: ReduxChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
