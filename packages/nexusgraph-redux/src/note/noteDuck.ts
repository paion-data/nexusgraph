// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { Graph } from "../..";
import { GlobalState } from "../globalState";

export const NOTE_STATE = "note";
const UPDATE_NOTE_ID = NOTE_STATE + "/UPDATE_NOTE_ID";
const UPDATE_NOTE_GRAPH = NOTE_STATE + "/UPDATE_NOTE_GRAPH";
const UPDATE_NOTE_EDITOR_CONTENT = NOTE_STATE + "/UPDATE_NOTE_EDITOR_CONTENT";
const CREATE_NEW_NOTE = NOTE_STATE + "/CREATE_NEW_NOTE";

export interface NoteState {
  id?: string;
  editorContent: object;
  graph: Graph;
}

export interface NoteAction {
  type: typeof NOTE_STATE;
  payload: string;
}

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

const initialGraph: Graph = {
  nodes: [],
  links: [],
};

const initialState: NoteState = {
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

export function updateNoteGraph(graph: Graph) {
  return { type: UPDATE_NOTE_GRAPH, payload: graph };
}

export function updateNoteEditorContent(editorContent: object) {
  return { type: UPDATE_NOTE_EDITOR_CONTENT, payload: editorContent };
}

export function updateNoteId(id?: string) {
  return { type: UPDATE_NOTE_ID, payload: id };
}

export function createNewNote() {
  return { type: CREATE_NEW_NOTE };
}
