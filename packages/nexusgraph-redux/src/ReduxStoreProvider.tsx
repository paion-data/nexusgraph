// Copyright 2023 Paion Data. All rights reserved.
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import rootReducers from "./rootReducer";
import { Provider } from "react-redux";
import * as asyncInitialState from 'redux-async-initial-state';
import { GlobalState } from './globalState';
import { NoteState } from './note/noteDuck';
import { NoteInfo } from './note-list/noteListDuck';
import { OAuthState } from './oAuth/oAuthDuck';
import { AstraiosClient } from '../../nexusgraph-astraios';
import { TYPES, container } from '../../nexusgraph-app/inversify.config';

interface ReduxChildren {
  children: React.ReactNode;
  initialNoteState: Promise<NoteState>
  initialNoteList: Promise<NoteInfo[]>,
  initialOAuthState?: OAuthState,
}

const ReduxStoreProvider = (props: ReduxChildren) => {

  const reducer = asyncInitialState.outerReducer(combineReducers<GlobalState>({
    ...(rootReducers as any),
    asyncInitialState: asyncInitialState.innerReducer
  }));

  const loadStore = (): Promise<GlobalState> => {
    new Promise(function(resolve) {
      resolve({
        [nlpData]: NlpState;
        [note]: NoteState;
        [oAuth]: OAuthState;
        [noteList]: NoteInfo[];
      });
    })
  }


  const store = createStore(
    reducer,
    compose(applyMiddleware(asyncInitialState.middleware(loadStore)))
  );
  // const {dispatch , getState} = store

  // asyncInitialState.middleware(load)(store)(dispatch)
  console.log("store.getState()", store.getState());


  return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxStoreProvider;
