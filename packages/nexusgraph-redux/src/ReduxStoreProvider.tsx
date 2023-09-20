// Copyright 2023 Paion Data. All rights reserved.
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import rootReducers from "./rootReducer";
import { Provider } from "react-redux";
import * as asyncInitialState from 'redux-async-initial-state';
import { GlobalState } from './globalState';
import { NoteState } from './note/noteDuck';
import { NoteInfo } from './note-list/noteListDuck';
import { OAuthState } from './oAuth/oAuthDuck';
import { Graph } from '..';

interface ReduxChildren {
  children: React.ReactNode;
  initialNoteState: Promise<NoteState>
  initialNoteList: Promise<NoteInfo[]>,
  initialOAuthState?: OAuthState,
}

const initialEditorContent: object = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "China",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

const initialGraph: Graph = {
  nodes: [{id: "8", fields: {}}, {id: "2", fields: {}}],
  links: [],
};

const ReduxStoreProvider = (props: ReduxChildren) => {

  const reducer = asyncInitialState.outerReducer(combineReducers<GlobalState>({
    ...(rootReducers as any),
    asyncInitialState: asyncInitialState.innerReducer
  }));

  const loadStore = (): Promise<GlobalState> => {
    return new Promise(function(resolve) {
      resolve({
        nlpData: {
          nodes: [{id: "8", fields: {}}, {id: "2", fields: {}}],
          links: [],
        },
        note: {
          editorContent: initialEditorContent,
          graph: initialGraph,
        },
        oAuth: {
          accessToken: "dev token",
          userInfo: {},
        },
        noteList: [
          {id:"1", title: "First note"},
          {id:"2", title: "Second note"}
        ],
      });
    })
  }


  const store = createStore(
    reducer,
    compose(applyMiddleware(asyncInitialState.middleware(loadStore)))
  );
  console.log("store.getState()", store.getState());


  return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxStoreProvider;
