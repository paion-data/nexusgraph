// Copyright 2023 Paion Data. All rights reserved.
import { render, fireEvent, getByLabelText, getByText, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import LexicalEditor from "../LexicalEditor";
import { screen } from "@testing-library/dom";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootReducers from "../../../../nexusgraph-graph/src/shared/rootReducer";
import React from "react";

const reducer = combineReducers({ ...rootReducers });
const store = configureStore({ reducer });

test("Button disabled should be added", async () => {
  render(
    <Provider store={store}>
      <LexicalEditor />
    </Provider>
  );
  const buttonList = ["Undo", "Redo"];
  for (let i = 0; i < buttonList.length; i++) {
    expect(await screen.findByRole("button", { name: buttonList[i] })).toBeDisabled();
  }
});

test("Button active should be added", async () => {
  render(
    <Provider store={store}>
      <LexicalEditor />
    </Provider>
  );
  const buttonList = [
    "Undo",
    "Redo",
    "Format Bold",
    "Format Italics",
    "Format Underline",
    "Format Strikethrough",
    "insert Code",
    "insert Link",
    "Left Align",
    "Center Align",
    "Right Align",
    "Justify Align",
  ];
  for (let i = 0; i < buttonList.length; i++) {
    fireEvent.click(await screen.findByRole("button", { name: buttonList[i] }));
    setTimeout(async () => {
      const styles = getComputedStyle(await screen.findByRole("button", { name: buttonList[i] }));
      expect(styles.boxShadow).toBe("inset 10px 5px 20px rgba(137,225,252,0.7)");
    }, 3000);
  }
});

test("OptionsButton text should be added", async () => {
  render(
    <Provider store={store}>
      <LexicalEditor />
    </Provider>
  );
  const spanList = [
    "Normal",
    "Large Heading",
    "Small Heading",
    "Bulleted List",
    "Numbered List",
    "Quote",
    "Code Block",
  ];
  fireEvent.click(await screen.findByRole("button", { name: /Formatting Options/i }));
  setTimeout(async () => {
    for (let i = 0; i < spanList.length; i++) {
      expect(await screen.findByText(spanList[i])).toBeInTheDocument();
    }
  }, 3000);
});
