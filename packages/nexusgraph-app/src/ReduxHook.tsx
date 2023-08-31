// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import { NoteState, UPDATE_NLPDATA } from "../../nexusgraph-redux";
import { selectNote } from "../../nexusgraph-redux/src/note/noteDuck";
import { container, TYPES } from "../inversify.config";

export default function useReduxHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosStorageProcessor);
  const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
    TYPES.NaturalLanguageProcessor
  );

  useEffect(() => {
    const update = () => {
      astraiosClient.saveOrUpdate(noteState);

      if (JSON.stringify(noteState.editorContent) !== "{}") {
        remoteNaturalLanguageProcessor.entityExtraction(noteState.editorContent).then((NlpState) => {
          dispatch({ type: UPDATE_NLPDATA, payload: NlpState });
        });
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState]);
}
