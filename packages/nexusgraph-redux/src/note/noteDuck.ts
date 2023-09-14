// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";
import { CREATE_NEW_NOTE, NoteState, UPDATE_NOTE_EDITOR_CONTENT, UPDATE_NOTE_GRAPH, UPDATE_NOTE_ID } from "./noteTypes";
import { GraphState } from "../..";

export const initialEditorContent: object = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

const initialGraph: GraphState = {
  nodes: [],
  links: [],
};

const initialState: NoteState = {
  id: "",
  editorContent: initialEditorContent,
  graph: initialGraph,
};

export function selectNote() {
  return useSelector((state: GlobalState) => state.note);
}

export default function noteReducer(state = initialState, action: any): NoteState {
  switch (action.type) {
    case UPDATE_NOTE_GRAPH:
      return {
        id: state.id,
        editorContent: state.editorContent,
        graph: action.payload,
      };
    case UPDATE_NOTE_EDITOR_CONTENT:
      return {
        id: state.id,
        editorContent: action.payload,
        graph: state.graph,
      };
    case UPDATE_NOTE_ID:
      return {
        id: action.payload,
        graph: state.graph,
        editorContent: state.editorContent,
      };
    case CREATE_NEW_NOTE:
      return initialState;
    default:
      return state;
  }
}
