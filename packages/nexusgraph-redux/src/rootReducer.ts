// Copyright 2023 Paion Data. All rights reserved.
import intelligentAIReducer, { INTELLIGENT_AI_STATE as intelligentAI } from "./intelligentAI/intelligentAIDuck";
import nlpReducer, { NLP_DATA as nlpData } from "./nlp/nlpDuck";
import noteListReducer, { NOTE_LIST_STATE as noteList } from "./note-list/noteListDuck";
import noteReducer, { NOTE_STATE as note } from "./note/noteDuck";
import oAuthReducer, { OAUTH_STATE as oAuth } from "./oAuth/oAuthDuck";

export default {
  [nlpData]: nlpReducer,
  [note]: noteReducer,
  [oAuth]: oAuthReducer,
  [noteList]: noteListReducer,
  [intelligentAI]: intelligentAIReducer,
};
