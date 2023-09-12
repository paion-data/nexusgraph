// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import { GlobalState, NoteState, UPDATE_NLPDATA, UPDATE_NOTE_ID, UPDATE_NOTE_LIST } from "../../nexusgraph-redux";
import { selectNote } from "../../nexusgraph-redux/src/note/noteDuck";
import { container, TYPES } from "../inversify.config";

export default function useReduxHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();

  const astraiosJsonApiClient: AstraiosClient = container.get<AstraiosClient>(TYPES.JsonApiAstraiosClient);
  const astraiosGraphQlClient: AstraiosClient = container.get<AstraiosClient>(TYPES.GraphQlClient);

  const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
    TYPES.NaturalLanguageProcessor
  );

  const accessToken = useSelector((state: GlobalState) => state.oAuth.accessToken);

  useEffect(() => {
    if (astraiosGraphQlClient.getNoteList) {
      astraiosGraphQlClient.getNoteList("456").then((response) => {
        if (response) {
          return dispatch({ type: UPDATE_NOTE_LIST, payload: response });
        }
      });
    }
  }, []);

  useEffect(() => {
    const update = () => {
      if (noteState && astraiosJsonApiClient.saveOrUpdate) {
        astraiosJsonApiClient.saveOrUpdate(noteState, accessToken).then((response) => {
          if (response.id) {
            dispatch({ type: UPDATE_NOTE_ID, payload: response.id });
          }
        });

        if (noteState && noteState.editorContent && JSON.stringify(noteState.editorContent) !== "{}") {
          remoteNaturalLanguageProcessor.entityExtraction(noteState.editorContent).then((NlpState) => {
            dispatch({ type: UPDATE_NLPDATA, payload: NlpState });
          });
        }
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState, accessToken]);
}
