// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import { GlobalState, initialEditorContent, NoteState, selectNote, updateNlpData } from "../../nexusgraph-redux";
import { container, TYPES } from "../inversify.config";

export default function useReduxHook() {
  const dispatch = useDispatch();
  const noteState: NoteState | undefined = selectNote();

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);
  const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
    TYPES.NaturalLanguageProcessor
  );

  const accessToken = useSelector((state: GlobalState) => state.oAuth.accessToken);

  useEffect(() => {
    const update = () => {
      if (noteState) {
        // astraiosClient.saveOrUpdate(noteState, accessToken).then((response) => {
        //     dispatch(updateNoteId(response.id));
        // });

        if (noteState && noteState.editorContent != initialEditorContent) {
          remoteNaturalLanguageProcessor.entityExtraction(noteState.editorContent).then((NlpState) => {
            dispatch(updateNlpData(NlpState));
          });
        }
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState, accessToken]);
}
