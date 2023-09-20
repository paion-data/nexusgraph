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

  const reducer = asyncInitialState.outerReducer(combineReducers<GlobalState>({ ...(rootReducers as any), asyncInitialState: asyncInitialState.innerReducer }));
  // const loadStore = () => {
  //   let preloadedState: Partial<GlobalState> = {};
  //   return props.initialNoteList.then((response) => {
  //     preloadedState.noteList = response
  //     return props.initialNoteState.then((response) => {
  //       preloadedState.note = response
  //       return preloadedState
  //     })
  //   }, () => { })
  // }

  const loadStore2 = (): Promise<Partial<GlobalState>> => {
    return new Promise(resolve => {
      let preloadedState: Partial<GlobalState> = {};
      return props.initialNoteList.then(response => {
        preloadedState.noteList = response
        return props.initialNoteState.then((response) => {
          preloadedState.note = response
          return preloadedState
        })
      })
        .then(resolve);
    });
  }

  // const load = () => Promise.resolve({
  //   "noteList": [{ id: "1", title: "title" }]
  // } as Partial<GlobalState>);

  // const load = (state: Partial<GlobalState>) => new Promise(resolve => {
  //   resolve(Object.assign(state, {
  //     noteList: [{ id: "1", title: "title" }],
  //   }));
  // });

  const store = createStore(
    reducer,
    compose(applyMiddleware(asyncInitialState.middleware(loadStore2)))
  );
  // const {dispatch , getState} = store

  // asyncInitialState.middleware(load)(store)(dispatch)
  console.log("store.getState()", store.getState());


  return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxStoreProvider;
