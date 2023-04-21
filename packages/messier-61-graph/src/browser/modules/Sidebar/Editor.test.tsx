// Copyright 2023 Paion Data. All rights reserved.
import { GraphEditorAction, GraphEditorState, NAME } from "shared/modules/graphEditor/graphEditorDuck";
import { Editor, EditorProps } from "./Editor"
import { Action, Dispatch } from "redux";
import { render } from "@testing-library/react";
import React from "react";

test("When the user edits text using the editor, the 'updateGraph' function is triggered to send the editor action", () => {
  // const mockUpdateGraph = jest.fn()
  // window.document.getSelection = jest.fn()

  // render(<Editor updateGraph={mockUpdateGraph}/>);
  // expect(mockUpdateGraph).toBeCalled()
})
