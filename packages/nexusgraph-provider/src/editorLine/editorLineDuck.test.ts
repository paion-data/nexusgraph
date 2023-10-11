// Copyright 2023 Paion Data. All rights reserved.
import { EditorAction, UPDATE_LINE } from "../types";
import editorReducer from "./editorLineDuck";

describe("The editor reducer updates the state of the editor lines", () => {
  it("Reducer can update the action in Chinese", () => {
    const initialState: string[] = [""];
    const action: EditorAction = { type: UPDATE_LINE, payload: ["中国"] };

    expect(editorReducer(initialState, action)).toStrictEqual(["中国"]);
  });

  it("Reducer can update the action in English", () => {
    const initialState: string[] = [""];
    const action: EditorAction = { type: UPDATE_LINE, payload: ["china"] };

    expect(editorReducer(initialState, action)).toStrictEqual(["china"]);
  });
});

it("The new action of editor overwrites the previous state", () => {
  const initialState: string[] = ["It's sunny today"];
  const action: EditorAction = { type: UPDATE_LINE, payload: ["It's going to rain heavily today"] };

  expect(editorReducer(initialState, action)).toStrictEqual(["It's going to rain heavily today"]);
});
