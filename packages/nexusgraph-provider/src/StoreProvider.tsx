//Copyright 2023 Paion Data. All rights reserved.
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { GlobalState } from "./shared/globalState";
import rootReducers from "./shared/rootReducer";

interface ReduxChildren {
  children: React.ReactNode;
}

const reducer = combineReducers<GlobalState>({ ...(rootReducers as any) });
const store = configureStore({ reducer });

const StoreWrapper = ({ children }: ReduxChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreWrapper;
