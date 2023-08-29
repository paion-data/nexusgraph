// Copyright 2023 Paion Data. All rights reserved.
import {
  AstraiosAction,
  AstraiosState,
  UPDATE_NOTE_EDITOR_CONTENT,
  UPDATE_NOTE_GRAPH,
  UPDATE_NOTE_ID,
} from "./astraiosTypes";

const initialState: AstraiosState = {
  data: {
    type: "note",
    id: "",
    attributes: {
      graph: "",
      editorContent: "",
    },
  },
};

export default function astraiosReducer(state = initialState, action: AstraiosAction): AstraiosState {
  switch (action.type) {
    case UPDATE_NOTE_GRAPH:
      return {
        data: {
          type: "note",
          id: state.data.id,
          attributes: {
            graph: action.payload,
            editorContent: state.data.attributes.editorContent,
          },
        },
      };
    case UPDATE_NOTE_EDITOR_CONTENT:
      return {
        data: {
          type: "note",
          id: state.data.id,
          attributes: {
            graph: state.data.attributes.graph,
            editorContent: action.payload,
          },
        },
      };
    case UPDATE_NOTE_ID:
      return {
        data: {
          type: "note",
          id: action.payload,
          attributes: {
            graph: state.data.attributes.graph,
            editorContent: state.data.attributes.editorContent,
          },
        },
      };
    default:
      return state;
  }
}
