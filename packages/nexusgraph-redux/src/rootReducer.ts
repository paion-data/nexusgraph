import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData } from "./nlp/nlpTypes";
import noteReducer from "./note/noteDuck";
import { NOTE_STATE as note } from "./note/noteTypes";

export default {
  [nlpData]: nlpReducer,
  [note]: noteReducer,
};
