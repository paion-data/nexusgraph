import nlpReducer from "./nlp/nlpDuck";
import { NLP_DATA as nlpData } from "./nlp/nlpTypes";
import noteReducer from "./note/noteDuck";
import { NOTE_STATE as astraios } from "./note/noteTypes";

export default {
  [nlpData]: nlpReducer,
  [astraios]: noteReducer,
};
