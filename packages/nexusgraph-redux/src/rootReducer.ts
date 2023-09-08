// Copyright 2023 Paion Data. All rights reserved.
import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData } from "./nlp/nlpTypes";
import noteReducer from "./note/noteDuck";
import { NOTE_STATE as note } from "./note/noteTypes";
import oAuthReducer from "./oAuth/oAuthDuck";
import { OAUTH_STATE as oAuth } from "./oAuth/oAuthType";

export default {
  [nlpData]: nlpReducer,
  [note]: noteReducer,
  [oAuth]: oAuthReducer,
};
