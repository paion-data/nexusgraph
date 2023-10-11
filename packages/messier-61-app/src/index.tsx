//Copyright 2023 Paion Data. All rights reserved.
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { GlobalState } from "../../messier-61-graph/src/shared/globalState";
import rootReducers from "../../messier-61-graph/src/shared/rootReducer";

const reducer = combineReducers<GlobalState>({ ...(rootReducers as any) });
export const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
