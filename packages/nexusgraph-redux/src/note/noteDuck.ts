// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { Graph } from "../..";
import { t } from "../../../nexusgraph-i18n";
import { GlobalState } from "../globalState";

export const NOTE_STATE = "note";
const UPDATE_NOTE_ID = NOTE_STATE + "/UPDATE_NOTE_ID";
const UPDATE_NOTE_TITLE = NOTE_STATE + "/UPDATE_NOTE_TITLE";
const UPDATE_NOTE_GRAPH = NOTE_STATE + "/UPDATE_NOTE_GRAPH";
const UPDATE_NOTE_EDITOR_CONTENT = NOTE_STATE + "/UPDATE_NOTE_EDITOR_CONTENT";
const CREATE_NEW_NOTE = NOTE_STATE + "/CREATE_NEW_NOTE";
const UPDATE_NOTE = NOTE_STATE + "/UPDATE_NOTE";

export interface NoteState {
  id?: string;
  title: string;
  editorContent: object;
  graph: Graph;
}

interface NoteAction {
  type: typeof NOTE_STATE;
  payload: any;
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

export const initialNoteState: NoteState = {
  title: "Untitled Note",
  editorContent: initialEditorContent,
  graph: initialGraph,
};

export function selectNote() {
  const initialTitle = t("graphInitialTitle");
  return useSelector((state: GlobalState) => {
    if (state.note.title == initialNoteState.title) {
      state.note.title = initialTitle;
      return state.note;
    }
    return state.note;
  });
}

export default function noteReducer(state = initialNoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case UPDATE_NOTE_GRAPH:
      return {
        id: state.id,
        title: state.title,
        editorContent: state.editorContent,
        graph: action.payload,
      };
    case UPDATE_NOTE_TITLE:
      return {
        id: state.id,
        title: action.payload,
        editorContent: state.editorContent,
        graph: state.graph,
      };
    case UPDATE_NOTE_EDITOR_CONTENT:
      return {
        id: state.id,
        title: state.title,
        editorContent: action.payload,
        graph: state.graph,
      };
    case UPDATE_NOTE_ID:
      return {
        id: action.payload,
        title: state.title,
        graph: state.graph,
        editorContent: state.editorContent,
      };
    case CREATE_NEW_NOTE:
      return initialNoteState;
    case UPDATE_NOTE:
      return action.payload;
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

export function updateNoteTitle(title: string) {
  return { type: UPDATE_NOTE_TITLE, payload: title };
}

export function createNewNote() {
  return { type: CREATE_NEW_NOTE };
}

export function updateNote(note: any) {
  return { type: UPDATE_NOTE, payload: note };
}
