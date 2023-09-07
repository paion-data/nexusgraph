// Copyright 2023 Paion Data. All rights reserved.
import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData } from "./nlp/nlpTypes";
import noteReducer from "./note/noteDuck";
import { NOTE_STATE as note } from "./note/noteTypes";
import oAuth2Reducer from "./oAuth2/oAuth2Duck";
import { OAUTH2_STATE as oAuth2 } from "./oAuth2/oAuth2Type";

export default {
  [nlpData]: nlpReducer,
  [note]: noteReducer,
  [oAuth2]: oAuth2Reducer,
};
