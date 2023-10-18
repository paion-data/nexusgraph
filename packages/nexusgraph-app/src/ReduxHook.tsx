// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import { NoteState, selectIntelligentAI, selectNote, selectOAuth, updateNlpData } from "../../nexusgraph-redux";
import { container, TYPES } from "../inversify.config";

export default function useReduxHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();
  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);
  const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
    TYPES.NaturalLanguageProcessor
  );
  const accessToken = selectOAuth().accessToken;
  const userId = selectOAuth().userInfo["sub"];

  const initialGraphText: string | null = selectIntelligentAI();

  useEffect(() => {
    const update = () => {
      if (noteState) {
        // astraiosClient.saveOrUpdate(noteState, accessToken, userId).then((response) => {
        //   dispatch(updateNoteId(response.id));
        // });
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState]);

  useEffect(() => {
    if (initialGraphText !== null) {
      remoteNaturalLanguageProcessor.entityExtraction(initialGraphText).then((NlpState) => {
        dispatch(updateNlpData(NlpState));
      });
    }
  }, [initialGraphText]);

  // useEffect(() => {
  //   astraiosClient.getNoteList(userId, accessToken).then((noteList) => {
  //     dispatch(updateNoteList(noteList));
  //   });
  // }, [noteState.id, noteState.title]);
}
